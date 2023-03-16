import { Role } from "@prisma/client";
import { Router } from "express";
import { z } from "zod";
import client from "../utilities/client";

const router = Router();

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
