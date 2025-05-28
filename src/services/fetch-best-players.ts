import { UsersRepository } from "@/repositories/users-repository";
import { User } from "generated/prisma";

interface FetchTop10PlayersServiceResponse {
  users: User[];
}

export class FetchTop10PlayersService {
  constructor(private userRepository: UsersRepository) {}

  async execute(): Promise<FetchTop10PlayersServiceResponse> {
    const users = await this.userRepository.findManyOrderedByBestScore(10); 

    return { users }; 
  }
}