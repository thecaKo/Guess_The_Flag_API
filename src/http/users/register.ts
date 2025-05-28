import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterService } from "@/services/register";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    username: z.string(),
    email: z.string(),
    password: z.string().min(6),
  });

  const { username, email, password } = registerBodySchema.parse(request.body);

  try {
    
    const userRepository = new PrismaUsersRepository()
    const registerService = new RegisterService(userRepository);

    await registerService.execute({ username, email, password });
  } catch (err) {
    throw err;
  }

  return reply.status(201).send();
}