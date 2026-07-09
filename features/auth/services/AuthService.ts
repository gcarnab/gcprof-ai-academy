/**
 * È l'orchestratore puro della logica di business. 
 * Valida le credenziali, calcola l'hashing, genera 
 * i token e lancia gli Errori Specifici di Dominio (InvalidCredentialsError, UserAlreadyExistsError)
 */
 
import { IUserRepository } from "../ports/IUserRepository";
import { IPasswordService } from "../ports/IPasswordService";
import { ITokenService } from "../ports/ITokenService";
import { RegisterStudentInputDto, LoginCredentialsDto, PublicUserDto, AuthResultDto } from "../dto/AuthDto";
import { StudentUser } from "../domain/user";
import { UserAlreadyExistsError } from "../errors/UserAlreadyExistsError";
import { InvalidCredentialsError } from "../errors/InvalidCredentialsError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { AUTH_ROLES, ACCOUNT_STATUS } from "../constants/AuthConstants";
import { logger } from "@/lib/logger";

export class AuthService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordService: IPasswordService,
    private readonly tokenService: ITokenService
  ) {}

  /**
   * 📝 Caso d'uso: Registrazione Studente
   */
  async register(input: RegisterStudentInputDto): Promise<PublicUserDto> {
    logger.info(`Tentativo di registrazione per l'email: ${input.email}`);

    // 1. Verifica se l'utente esiste già
    const existingUser = await this.userRepository.findByEmail(input.email);
    if (existingUser) {
      logger.warn(`Registrazione fallita: l'email ${input.email} esiste già.`);
      throw new UserAlreadyExistsError(input.email);
    }

    // 2. Cifratura della password (Isolata dall'infrastruttura)
    const passwordHash = await this.passwordService.hash(input.passwordRaw);

    // 3. Costruzione dell'entità di dominio allineata allo schema dell'adapter
    const displayName = `${input.firstName} ${input.lastName}`.trim();
    const newStudent: Omit<StudentUser, "id" | "createdAt" | "updatedAt"> = {
      firstName: input.firstName,
      lastName: input.lastName,
      displayName,
      email: input.email.toLowerCase().trim(),
      passwordHash,
      role: AUTH_ROLES.STUDENT,
      status: ACCOUNT_STATUS.ACTIVE, // Attivo di default, modificabile dall'Admin
      emailVerified: false,
      // Usiamo 'classes' coerentemente con il tipo richiesto dall'adapter e dal dominio
      classes: [input.studentClass.toUpperCase()],
      enrolledCourses: []
    } as any; // Cast temporaneo se l'interfaccia di dominio ha lievi discrepanze nominali

    // 4. Salvataggio nel repository (Disaccoppiato dallo storage reale)
    const savedUser = await this.userRepository.create(newStudent);
    logger.info(`Studente registrato con successo. ID: ${savedUser.id}`);

    // 5. Ritorno del DTO sicuro (Senza passwordHash)
    const { passwordHash: _, ...publicUser } = savedUser;
    return publicUser;
  }

  /**
   * 🔑 Caso d'uso: Login Utente
   */
  async login(credentials: LoginCredentialsDto): Promise<AuthResultDto> {
    logger.info(`Tentativo di login per: ${credentials.email}`);

    // 1. Cerca l'utente nel database
    const user = await this.userRepository.findByEmail(credentials.email);
    if (!user) {
      logger.warn(`Login fallito: utente ${credentials.email} non trovato.`);
      throw new InvalidCredentialsError();
    }

    // 2. Controllo dello stato dell'account
    if (user.status === ACCOUNT_STATUS.BLOCKED) {
      logger.warn(`Login rifiutato: l'account ${credentials.email} è bloccato.`);
      throw new UnauthorizedError("Il tuo account è stato sospeso. Contatta il docente.");
    }

    // 3. Verifica della password tramite l'algoritmo iniettato
    const isPasswordValid = await this.passwordService.verify(credentials.passwordRaw, user.passwordHash);
    if (!isPasswordValid) {
      logger.warn(`Login fallito: password errata per ${credentials.email}.`);
      throw new InvalidCredentialsError();
    }

    // 4. 🎯 FIX: Tracciamento dell'ultimo accesso usando il campo 'updatedAt' supportato dall'adapter.
    // Questo permette l'esecuzione di una reale query di UPDATE senza incappare nel blocco dei payload vuoti.
    await this.userRepository.update(user.id, { 
      updatedAt: new Date().toISOString() 
    });

    // 5. Generazione del Token JWT autonomo ed enterprise
    const tokenPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
      classes: user.classes || (user as any).allowedClasses || [],
      displayName: user.displayName
    };
    const token = await this.tokenService.generate(tokenPayload);

    logger.info(`Login completato per ${user.email}. Token emesso.`);

    // 6. Ritorno del risultato aggregato in un DTO
    const { passwordHash: _, ...publicUser } = user;
    return { user: publicUser, token };
  }
}