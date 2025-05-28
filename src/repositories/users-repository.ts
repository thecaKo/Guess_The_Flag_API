import { User, Prisma } from "@/../generated/prisma";

export interface UsersRepository {
  create(data: Prisma.UserCreateInput) : Promise <User>
  findByEmail(email: string) : Promise<User | null>
  findByUsername(username: string) : Promise<User | null>
  fetchAllUser() : Promise<User[]>
  findManyOrderedByBestScore(limit: number) : Promise< User[]>
}