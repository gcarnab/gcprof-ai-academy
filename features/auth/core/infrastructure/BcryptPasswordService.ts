import { IPasswordService } from "../ports/IPasswordService";
import bcrypt from "bcryptjs";

export class BcryptPasswordService implements IPasswordService {
  private readonly saltRounds: number = 10;

  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return bcrypt.hash(password, salt);
  }

  async verify(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}