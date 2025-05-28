import { FastifyInstance } from "fastify";
import { register } from "./register"
import { createUserSchema, loginUserSchema } from "./user-schema"
import { authenticate } from "./authenticate";


export async function usersRoutes(app: FastifyInstance) {
  app.post("/register", { schema: createUserSchema }, register);
  app.post("/login", { schema: loginUserSchema}, authenticate);
}