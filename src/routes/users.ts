import { Role } from "@prisma/client";
import { Router } from "express";
import { z } from "zod";
import client from "../utilities/client";

const router = Router();

/**
 * @openapi
 * /users:
 *  get:
 *    tags:
 *      - Users
 *    description: "Gets the users based upon their email."
 *    summary: "Gets the users"
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/emailInfo'
 *    responses:
 *      200:
 *        description: "The users were successfully found"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/userArray'
 *      400:
 *        description: "The request body is invalid"
 *      404:
 *        description: "Server not found"
 */

router.get("/", async (req, res, next) => {
  const schema = z.object({
    email: z.string().email(),
  });

  try {
    const query = schema.parse(req.query);
    const users = await client.user.findMany({
      where: { email: query.email },
    });

    res.send(users);
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /users:
 *  post:
 *    tags:
 *      - Users
 *    summary: "Creates a user"
 *    description: "Creates a user based off of the given input and returns the created user."
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/userCreationInfo'
 *    responses:
 *      201:
 *        description: "User created succesfully"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/user'
 *      400:
 *        description: "Invalid request body"
 *      404:
 *        description: "Server not found"
 */

router.post("/", async (req, res, next) => {
  const schema = z.object({
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    role: z.nativeEnum(Role),
  });

  try {
    const body = schema.parse(req.body);
    const newUser = await client.user.create({
      data: { isMock: true, ...body },
    });

    res.status(201).send(newUser);
  } catch (err) {
    next(err);
  }
});

export default router;
