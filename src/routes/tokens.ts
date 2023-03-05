import { Router } from "express";
import { z } from "zod";
import client from "../utilities/client";
import { sign } from "../utilities/tokens";

const router = Router();

router.post("/", async (req, res, next) => {
  const schema = z.object({
    email: z.string().email(),
  });
  const body = schema.parse(req.body);

  try {
    const user = await client.user.findUniqueOrThrow({
      where: { email: body.email },
    });

    const token = sign({ email: user.email });

    res.status(201).send(token);
  } catch (err) {
    next(err);
  }
});

export default router;
