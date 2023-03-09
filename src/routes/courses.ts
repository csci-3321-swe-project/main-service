import { DayOfWeek, Department, Term } from "@prisma/client";
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

router.get(
  "/:courseId",
  authorize(["ADMINISTRATOR", "PROFESSOR", "STUDENT"]),
  (req, res, next) => {
    // TODO: Retrieve course information
  }
);

router.get("/:courseId", async (req, res, next) => {
  // ALL: Retrieve course information
  try {
    const course = await client.course.findUniqueOrThrow({
      where: { id: req.params.courseId }
    })
    res.status(200).send(course)
  } catch(err) {
    next(err)
  }
});

router.put("/:courseId", async (req, res, next) => {
  // ADMIN: Update course information
  const schema = z.object({
    name: z.optional(z.string()),
    term: z.optional(z.nativeEnum(Term)),
    department: z.optional(z.nativeEnum(Department)),
    code: z.optional(z.number()),
    description: z.optional(z.string())
  });

  const body = schema.parse(req.body)

  try {
    await client.course.update({
      where: { id: req.params.courseId },
      data: req.body
    })
    res.sendStatus(200)
  } catch(err) {
    next(err)
  }
});

router.post(
  "/:courseId/sections",
  authorize(["ADMINISTRATOR"]),
  async (req, res, next) => {
    const schema = z.object({
      id: z.string(),
      meetings: z.array(
        z.object({
          daysOfWeek: z.array(z.nativeEnum(DayOfWeek)),
          startTime: z.string().datetime(),
          endTime: z.string().datetime(),
          location: z.string(),
        })
      ),
      instructorId: z.string(),
    });

    const body = schema.parse(req.body);

    try {
      await client.courseSection.create({
        data: {
          courseId: req.params.courseId,
          ...body,
        },
      });
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
