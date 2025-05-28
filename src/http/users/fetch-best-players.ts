import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { FetchTop10PlayersService } from "@/services/fetch-best-players";
import { FastifyReply, FastifyRequest } from "fastify";


export async function fetchTop10Players(request: FastifyRequest, reply: FastifyReply) {
  try {
    const userRepository = new PrismaUsersRepository();
    const fetchTop10PlayersService = new FetchTop10PlayersService(userRepository);

    const { users } = await fetchTop10PlayersService.execute();

    return reply.status(200).send(users);
  } catch (error) {
    console.error("Erro ao buscar o ranking dos melhores jogadores:", error);
    return reply.status(500).send({ message: "Erro interno do servidor ao buscar o ranking." });
  }
}