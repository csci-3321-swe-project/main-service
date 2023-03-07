import { DaysOfWeek, Department, Term } from "@prisma/client";
import { Router } from "express";
import { z } from "zod";
import authorize from "../middleware/authorize";
import client from "../utilities/client";

const router = Router();

router.get(
  "/",
  authorize(["ADMINISTRATOR", "PROFESSOR", "STUDENT"]),
  (req, res, next) => {
    // TODO: Retrieve courses given search criterion
  }
);

router.post("/", authorize(["ADMINISTRATOR"]), async (req, res, next) => {
  const schema = z.object({
    id: z.string(),
    name: z.string(),
    term: z.nativeEnum(Term),
    department: z.nativeEnum(Department),
    code: z.number(),
    description: z.string(),
  });

  const body = schema.parse(req.body);

  try {
    await client.course.create({ data: body });
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

router.delete("/", authorize(["ADMINISTRATOR"]), (req, res, next) => {
  // TODO: Delete a class, and any associated records
});

router.get(
  "/:courseId",
  authorize(["ADMINISTRATOR", "PROFESSOR", "STUDENT"]),
  (req, res, next) => {
    // TODO: Retrieve course information
  }
);

router.put("/:courseId", authorize(["ADMINISTRATOR"]), (req, res, next) => {
  // TODO: Update course information
});

router.post(
  "/:courseId/sections",
  authorize(["ADMINISTRATOR"]),
  async (req, res, next) => {
    const schema = z.object({
      id: z.string(),
      meetings: z.array(
        z.object({
          daysOfWeek: z.array(z.nativeEnum(DaysOfWeek)),
          startTime: z.string().datetime(),
          endTime: z.string().datetime(),
          location: z.string(),
        })
      ),
      instructorId: z.string(),
    });

    const body = schema.parse(req.body);

    const courseSection = Object.assign(
      { courseId: req.params.courseId },
      body
    );

    try {
      await client.courseSection.create({ data: courseSection });
      res.sendStatus(201);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/:courseId/sections/:sectionId",
  authorize(["ADMINISTRATOR", "PROFESSOR", "STUDENT"]),
  (req, res, next) => {
    // TODO: Retrieve course section information
  }
);

router.get(
  "/:courseId/sections/:sectionId/roster",
  authorize(["ADMINISTRATOR", "PROFESSOR"]),
  (req, res, next) => {
    // TODO: Retrieve the roster for a course section
  }
);

router.delete(
  "/:courseId/sections/:sectionId",
  authorize(["ADMINISTRATOR"]),
  (req, res, next) => {
    // TODO: Delete course section
  }
);

router.put(
  "/:courseId/sections/:sectionId",
  authorize(["ADMINISTRATOR"]),
  (req, res, next) => {
    // TODO: Update section information
  }
);

router.post(
  "/:courseId/sections/:sectionId/registrations",
  authorize(["STUDENT"]),
  (req, res, next) => {
    // TODO: Register current active user for course
  }
);

export default router;
