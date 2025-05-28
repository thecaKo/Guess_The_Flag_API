import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { FetchProfileByUserNameService } from "@/services/fetch-me-profile";
import { FastifyReply, FastifyRequest } from "fastify";

declare module 'fastify' {
  interface FastifyRequest {
    user: {
      username: string;
      sub: string;
    };
  }
}


export async function fetchProfile(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify();

    const userRepository = new PrismaUsersRepository()
    const fetchMeProfileService = new FetchProfileByUserNameService(userRepository)

    const profile = request.user.username;

    const user = await fetchMeProfileService.execute({username: profile})

    return reply.status(200).send(user);
}