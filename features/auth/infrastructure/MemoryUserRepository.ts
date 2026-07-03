import { IUserRepository } from "../ports/IUserRepository";
import { StudentUser } from "../domain/user";

export class MemoryUserRepository implements IUserRepository {
  private static usersCollection: StudentUser[] = [
    {
      id: "admin-1",
      firstName: "Giuseppe",
      lastName: "Carnabuci",
      displayName: "Giuseppe Carnabuci",
      email: "admin@gcprofaiacademy.vercel.app", // o la tua email di admin
      passwordHash: "$2a$10$...", // il tuo hash esistente
      role: "admin",
      status: "active",
      emailVerified: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),

      // 🎯 FIX: Sostituito 'allowedClasses' con 'classes'
      classes: [],

      // 🎯 FIX: Se richiesto da StudentUser, inseriamo anche l'array dei corsi iscritti vuoto
      enrolledCourses: [],
    },
  ];

  async findByEmail(email: string): Promise<StudentUser | null> {
    const user = MemoryUserRepository.usersCollection.find(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );
    return user ? { ...user } : null;
  }

  async findById(id: string): Promise<StudentUser | null> {
    const user = MemoryUserRepository.usersCollection.find((u) => u.id === id);
    return user ? { ...user } : null;
  }

  async create(
    user: Omit<StudentUser, "id" | "createdAt" | "updatedAt">,
  ): Promise<StudentUser> {
    const now = new Date().toISOString();
    const newUser: StudentUser = {
      ...user,
      id: `std_${Math.random().toString(36).substring(2, 11)}`,
      createdAt: now,
      updatedAt: now,
    };
    MemoryUserRepository.usersCollection.push(newUser);
    return { ...newUser };
  }

  async update(
    id: string,
    data: Partial<Omit<StudentUser, "id" | "createdAt">>,
  ): Promise<StudentUser> {
    const index = MemoryUserRepository.usersCollection.findIndex(
      (u) => u.id === id,
    );
    if (index === -1) throw new Error("Utente non trovato nel sistema.");

    MemoryUserRepository.usersCollection[index] = {
      ...MemoryUserRepository.usersCollection[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return { ...MemoryUserRepository.usersCollection[index] };
  }

  async delete(id: string): Promise<boolean> {
    const initialLength = MemoryUserRepository.usersCollection.length;
    MemoryUserRepository.usersCollection =
      MemoryUserRepository.usersCollection.filter((u) => u.id !== id);
    return MemoryUserRepository.usersCollection.length < initialLength;
  }

  async list(): Promise<StudentUser[]> {
    return [...MemoryUserRepository.usersCollection];
  }
}
