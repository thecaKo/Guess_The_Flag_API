import { FastifyInstance } from "fastify";
import { register } from "./register"
import { createUserSchema } from "./user-schema"


export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", { schema: createUserSchema }, register);
}