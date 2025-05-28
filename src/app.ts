import { fastify } from "fastify";
import { usersRoutes } from "./http/users/routes";
import fastifyCors from "@fastify/cors";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "10m",
  },
});

app.register(fastifyCors, {
  origin: "http://localhost:3000",
  credentials: true,
});

app.register(fastifyCookie);

app.register(usersRoutes)