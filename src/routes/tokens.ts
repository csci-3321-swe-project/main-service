import { Router } from "express";
import { z } from "zod";
import client from "../utilities/client";
import { sign } from "../utilities/tokens";

const router = Router();

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
