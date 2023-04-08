import { DayOfWeek, Department, Role, Term } from "@prisma/client";
import { Router } from "express";
import options from "../utilities/options";

const router = Router();

router.get("/", (_, res) => {
  res.status(200).send({
    roles: options(Role),
    departments: options(Department),
    daysOfWeek: options(DayOfWeek),
  });
});

export default router;
