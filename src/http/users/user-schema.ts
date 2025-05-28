import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

export const createUserSchema = {
  tags: ["users"],
  description: "Create a new user.",
  body: zodToJsonSchema(
    z.object({
      username: z.string(),
      email: z.string(),
      password: z.string(),
    }),
  ),
  response: {
    200: z.array(z.object({})),
  },
};

export const loginUserSchema = {
  tags: ["users"],
  description: "Make login of an registered user.",
  body: zodToJsonSchema(
    z.object({
      email: z.string(),
      password: z.string(),
    }),
  ),
  response: {
    200: z.array(
      z.object({
        token: z.string(),
      }),
    ),
  },
};

export const logoutUserSchema = {
  tags: ["users"],
  description: "Remove the token of logged user.",
  response: {
    200: z.array(z.object({})),
  },
};

