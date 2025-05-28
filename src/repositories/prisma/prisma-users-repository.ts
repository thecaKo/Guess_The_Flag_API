import { Prisma, User } from "generated/prisma";
import { UsersRepository } from "../users-repository";
import { prisma } from "@/lib/prisma";

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({ data })

    return user
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findFirst({ where: { email: email } })

    return user;
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await prisma.user.findFirst({ where: { username: username } });

    if (!user) {
      return null;
    }

    return user;
  }

  async fetchAllUser(): Promise<User[]> {
    const users = await prisma.user.findMany();

    return users;
  }

  async findManyOrderedByBestScore(limit: number = 10): Promise<User[]> {
    const users = await prisma.user.findMany({
      orderBy: {
        bestScore: 'desc',
      },
      take: limit,
    });

    return users;
  }

  async save(user: User): Promise<User> {
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: user,
    });

    return updatedUser;
  }
}