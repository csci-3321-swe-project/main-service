import { Router } from "express";
import { z } from "zod";
import client from "../utilities/client";
import { sign } from "../utilities/tokens";

const router = Router();

router.post("/", async (req, res, next) => {
  // Validate the request body
  const schema = z.object({
    email: z.string().email(),
  });
  const body = schema.parse(req.body);

  try {
    // Find a user from the email provided by the client
    const user = await client.user.findUniqueOrThrow({
      where: { email: body.email },
    });

    // Ensure a user is a mock user to use this token service
    if (!user.isMock) {
      res.sendStatus(400);
      return;
    }

    // Finally, send a signed token
    res.status(201).send(sign({ userId: user.id }));
  } catch (err) {
    next(err);
  }
});

export default router;
