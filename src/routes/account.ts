import { Router } from "express";

const router = Router();

router.get("/", (_, res) => {
  res.send(res.locals.user);
});

export default router;
