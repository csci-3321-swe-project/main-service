import { DayOfWeek, Department, Role, Season } from "@prisma/client";
import { Router } from "express";
import options from "../utilities/options";

const router = Router();

router.get("/", (_, res) => {
  res.status(200).send({
    seasons: options(Season),
    roles: options(Role),
    departments: options(Department),
    daysOfWeek: options(DayOfWeek),
  });
});

export default router;
