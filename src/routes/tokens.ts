import { Router } from "express";
import { z } from "zod";
import client from "../utilities/client";
import { sign } from "../utilities/tokens";

const router = Router();

/**
 * @openapi
 * /tokens:
 *  post:
 *    tags:
 *      - Tokens
 *    description: "Recieves an email, checks if the user exists in the system, if they do and are a mock user, it returns a token"
 *    summary: "Creates a token for the user"
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/emailInfo'
 *    responses:
 *      201:
 *        description: "Token was generated successfully"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/token'
 *      400:
 *        description: "User is not a mock user or the Request Body us invalid" 
 *      404: 
 *        description: "Server not found"
 */

router.post("/", async (req, res, next) => {
  const schema = z.object({
    email: z.string().email(),
  });

  try {
    const body = schema.parse(req.body);
    const user = await client.user.findUniqueOrThrow({
      where: { email: body.email },
    });

    // Ensure a user is a mock user to use this token service
    if (!user.isMock) {
      res.sendStatus(400);
      return;
    }

    res.status(201).send(sign({ userId: user.id }));
  } catch (err) {
    next(err);
  }
});

export default router;
