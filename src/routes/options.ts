import { DayOfWeek, Department, Role, Term } from "@prisma/client";
import { Router } from "express";
import options from "../utilities/options";

const router = Router();

router.get("/roles", (req, res, next) => {
  res.send(options(Role));
});

router.get("/departments", (req, res, next) => {
  res.send(options(Department));
});

router.get("/days-of-week", (req, res, next) => {
  res.send(options(DayOfWeek));
});

router.get("/terms", (req, res, next) => {
  res.send(options(Term));
});

export default router;
