import jwt from "jsonwebtoken";
import { z } from "zod";
import environment from "./environment";

const payloadSchema = z.object({
  email: z.string().email(),
});

type Payload = z.infer<typeof payloadSchema>;

export const sign = (payload: Payload): string => {
  return jwt.sign(payload, environment.JWT_SECRET);
};

export const parse = (token: string): Payload => {
  return payloadSchema.parse(jwt.verify(token, environment.JWT_SECRET));
};
