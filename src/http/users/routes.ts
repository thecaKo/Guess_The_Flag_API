import { FastifyInstance } from "fastify";
import { register } from "./register"
import { createUserSchema, loginUserSchema, logoutUserSchema } from "./user-schema"
import { authenticate } from "./authenticate";
import { logout } from "./logout";
import { fetchProfile } from "./fetch-me-profile";
import { fetchTop10Players } from "./fetch-best-players";


export async function usersRoutes(app: FastifyInstance) {
  app.post("/register", { schema: createUserSchema }, register);

  app.post("/login", { schema: loginUserSchema }, authenticate);

  app.get('/logout', { schema: logoutUserSchema }, logout)

  app.get('/me', fetchProfile)

  app.get('/ranking', fetchTop10Players)

}