import { DayOfWeek, Department, Role, Term } from "@prisma/client";
import { Router } from "express";
import options from "../utilities/options";

const router = Router();

router.get("/", (_, res) => {
  res.send({
    roles: options(Role),
    departments: options(Department),
    daysOfWeek: options(DayOfWeek),
    terms: options(Term),
  });
});

export default router;
