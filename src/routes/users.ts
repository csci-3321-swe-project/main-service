import { Role } from "@prisma/client";
import { Router } from "express";
import { z } from "zod";
import client from "../utilities/client";

const router = Router();

router.post("/", async (req, res, next) => {
  // Validate the request body
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
