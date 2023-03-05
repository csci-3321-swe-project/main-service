import { Role } from "@prisma/client";
import { Router } from "express";
import { z } from "zod";
import client from "../utilities/client";

const router = Router();

router.post("/", async (req, res, next) => {
  const schema = z.object({
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    role: z.nativeEnum(Role),
  });

  const body = schema.parse(req.body);

  try {
    await client.user.create({ data: body });
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

export default router;
