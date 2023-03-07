import { Router } from "express";
import authorize from "../middleware/authorize";

const router = Router();

router.get("/", (_, res) => {
  authorize(["ADMINISTRATOR", "PROFESSOR", "STUDENT"]),
    res.send(res.locals.user);
});

export default router;
