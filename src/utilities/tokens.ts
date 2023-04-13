import jwt from "jsonwebtoken";
import { z } from "zod";
import environment from "./environment";

// This is the schema for the payload of the JWT token.
const payloadSchema = z.object({
  userId: z.string(),
});

type Payload = z.infer<typeof payloadSchema>;

/**
 * Sign takes a payload and returns a signed token.
 * @param {Payload} payload - The payload to sign.
 * @returns {string} - The signed token.
 */
export const sign = (payload: Payload): string => {
  return jwt.sign(payload, environment.JWT_SECRET);
};

/**
 * Parse takes a token and returns the payload.
 * @param {string} token - The token to parse.
 * @returns @type {Payload} - The payload of the token.
 */
export const parse = (token: string): Payload => {
  return payloadSchema.parse(jwt.verify(token, environment.JWT_SECRET));
};
