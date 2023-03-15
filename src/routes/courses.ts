import { DayOfWeek, Department, Term } from "@prisma/client";
import { Router } from "express";
import { z } from "zod";
import authorize from "../middleware/authorize";
import client from "../utilities/client";
import { TimeRange } from "../utilities/time-range";

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
    name: z.string(),
    term: z.nativeEnum(Term),
    department: z.nativeEnum(Department),
    code: z.number(),
    description: z.string(),
  });

  try {
    const body = schema.parse(req.body);
    const newCourse = await client.course.create({ data: body });

    res.status(201).send(newCourse);
  } catch (err) {
    next(err);
  }
});

router.get(
  "/:courseId",
  authorize(["ADMINISTRATOR", "PROFESSOR", "STUDENT"]),
  async (req, res, next) => {
    try {
      const course = await client.course.findUniqueOrThrow({
        where: { id: req.params.courseId },
        include: { courseSections: true },
      });

      res.status(200).send(course);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/:courseId",
  authorize(["ADMINISTRATOR"]),
  async (req, res, next) => {
    const schema = z.object({
      name: z.optional(z.string()),
      term: z.optional(z.nativeEnum(Term)),
      department: z.optional(z.nativeEnum(Department)),
      code: z.optional(z.number()),
      description: z.optional(z.string()),
    });

    try {
      const body = schema.parse(req.body);
      const updatedCourse = await client.course.update({
        where: { id: req.params.courseId },
        data: body,
      });

      res.status(200).send(updatedCourse);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/:courseId/sections",
  authorize(["ADMINISTRATOR"]),
  async (req, res, next) => {
    const schema = z.object({
      instructorIds: z.array(z.string()).nonempty(),
      meetings: z
        .array(
          z.object({
            daysOfWeek: z.array(z.nativeEnum(DayOfWeek)).nonempty(),
            startHour: z.number(),
            startMinute: z.number(),
            endHour: z.number(),
            endMinute: z.number(),
            location: z.string(),
          })
        )
        .nonempty(),
    });

    try {
      const body = schema.parse(req.body);

      // Check meeting time validity
      for (const meeting of body.meetings) {
        if (!new TimeRange({ ...meeting }).isValid) {
          res.sendStatus(400);
          return;
        }
      }

      const newCourseSection = await client.courseSection.create({
        data: {
          courseId: req.params.courseId,
          ...body,
        },
      });

      res.status(201).send(newCourseSection);
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
