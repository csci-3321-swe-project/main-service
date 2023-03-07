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

  const body = schema.parse(req.body);

  try {
    // Create a mock user in the database
    await client.user.create({ data: { isMock: true, ...body } });
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

export default router;
