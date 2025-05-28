import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";
import { User } from "generated/prisma";

interface RegisterServiceRequest {
  username: string,
  email: string,
  password: string
}

interface RegisterServiceResponse {
  user: User;
}

export class RegisterService {
  constructor(private userRepository: UsersRepository) {}

  async execute({username, email, password} : RegisterServiceRequest): Promise<RegisterServiceResponse> {


    const password_hash = await hash(password, 6);


    const userWithSameEmail = await this.userRepository.findByEmail(email);

    if(userWithSameEmail){
      throw new Error("Email inválido")
    }

    const user = await this.userRepository.create({
      username,
      email,
      password_hash,
    })

    return { user }

  }
}