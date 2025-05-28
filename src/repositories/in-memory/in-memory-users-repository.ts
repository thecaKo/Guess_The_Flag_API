import { Prisma, User } from "generated/prisma";
import { UsersRepository } from "../users-repository";
import { randomUUID } from "crypto";


export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async create(data: Prisma.UserCreateInput): Promise<User> {

    let finalLastPlayed: Date;

    if (data.lastPlayed instanceof Date) {
      finalLastPlayed = data.lastPlayed;
    } else if (typeof data.lastPlayed === 'string') {
      finalLastPlayed = new Date(data.lastPlayed);
    } else {
      finalLastPlayed = new Date();
    }

    const user: User = {
      id: randomUUID(),
      username: data.username,
      password_hash : data.password_hash,
      email: data.email,
      bestScore : data.bestScore ?? 0,
      lastPlayed: finalLastPlayed
    }

    this.items.push(user)

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = this.items.find((item) => item.username === username);

    if(!user){
      return null
    }

    return user;
  }

  async fetchAllUser(): Promise<User[]> {
    return this.items;
  }

  async findManyOrderedByBestScore(limit: number = 10): Promise<User[]> {
    return this.items
      .sort((a, b) => b.bestScore - a.bestScore)
      .slice(0, limit);
  }

  async save(user: User): Promise<User> {
    const userIndex = this.items.findIndex(item => item.id === user.id);
    if (userIndex >= 0) {
      this.items[userIndex] = user;
    }
    return user;
  }
}