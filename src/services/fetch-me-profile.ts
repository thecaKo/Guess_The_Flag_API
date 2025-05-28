import { UsersRepository } from "@/repositories/users-repository";
import { User } from "generated/prisma";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";


type UserWithoutPassword = Omit<User, "password_hash">;

interface FetchProfileServiceRequest {
  username: string;
}

interface FetchProfileServiceResponse {
  profile: UserWithoutPassword;
}

export class FetchProfileByUserNameService {
  constructor(private userRepository: UsersRepository) {}

  async execute({ username }: FetchProfileServiceRequest): Promise<FetchProfileServiceResponse> {
    const user = await this.userRepository.findByUsername(username)

    if (!user) {
      throw new ResourceNotFoundError();
    }

    const { password_hash, ...userWithoutPassword } = user;

    return { profile: userWithoutPassword };
  }
}