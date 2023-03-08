import { Router } from "express";
import authorize from "../middleware/authorize";

const router = Router();

router.get(
  "/",
  authorize(["ADMINISTRATOR", "PROFESSOR", "STUDENT"]),
  (_, res) => {
    res.send(res.locals.user);
  }
);

export default router;
