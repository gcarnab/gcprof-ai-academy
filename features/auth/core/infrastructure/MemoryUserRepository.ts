import { IUserRepository } from "../ports/IUserRepository";
import { StudentUser } from "../domain/user";
import { ACCOUNT_STATUS, AUTH_ROLES } from "../constants/AuthConstants";

export class MemoryUserRepository implements IUserRepository {
  private static usersCollection: StudentUser[] = [
    {
      id: "admin-1",
      firstName: "Giuseppe",
      lastName: "Carnabuci",
      displayName: "Prof. G. Carnabuci",
      email: "admin@scuola.it",
      // Password originaria: "admin123"
      passwordHash: "$2a$10$7R6v7Y/B8b0e77nZ.THeGex7E1Vl7GZ2BbeC09X9wE2O7K1i7vD2W",
      role: AUTH_ROLES.ADMIN,
      status: ACCOUNT_STATUS.ACTIVE,
      emailVerified: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      allowedClasses: ["ALL"],
      enrolledCourses: []
    }
  ];

  async findByEmail(email: string): Promise<StudentUser | null> {
    const user = MemoryUserRepository.usersCollection.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    return user ? { ...user } : null;
  }

  async findById(id: string): Promise<StudentUser | null> {
    const user = MemoryUserRepository.usersCollection.find((u) => u.id === id);
    return user ? { ...user } : null;
  }

  async create(user: Omit<StudentUser, "id" | "createdAt" | "updatedAt">): Promise<StudentUser> {
    const now = new Date().toISOString();
    const newUser: StudentUser = {
      ...user,
      id: `std_${Math.random().toString(36).substring(2, 11)}`,
      createdAt: now,
      updatedAt: now
    };
    MemoryUserRepository.usersCollection.push(newUser);
    return { ...newUser };
  }

  async update(id: string, data: Partial<Omit<StudentUser, "id" | "createdAt">>): Promise<StudentUser> {
    const index = MemoryUserRepository.usersCollection.findIndex((u) => u.id === id);
    if (index === -1) throw new Error("Utente non trovato nel sistema.");

    MemoryUserRepository.usersCollection[index] = {
      ...MemoryUserRepository.usersCollection[index],
      ...data,
      updatedAt: new Date().toISOString()
    };
    return { ...MemoryUserRepository.usersCollection[index] };
  }

  async delete(id: string): Promise<boolean> {
    const initialLength = MemoryUserRepository.usersCollection.length;
    MemoryUserRepository.usersCollection = MemoryUserRepository.usersCollection.filter((u) => u.id !== id);
    return MemoryUserRepository.usersCollection.length < initialLength;
  }

  async list(): Promise<StudentUser[]> {
    return [...MemoryUserRepository.usersCollection];
  }
}