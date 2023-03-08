import { Router } from "express";
import { z } from "zod";
import client from "../utilities/client";
import { Term, Department, Course, DaysOfWeek } from "@prisma/client"

const router = Router();

router.get("/", (req, res, next) => {
  // ALL: Retrieve course information given query and filters.
});

router.post("/", async (req, res, next) => {
  // ADMIN: Create class
  const schema = z.object({
    id: z.string(),
    name: z.string(),
    term: z.nativeEnum(Term),
    department: z.nativeEnum(Department),
    code: z.number(),
    description: z.string()
  });

  const body = schema.parse(req.body);

  try {
    await client.course.create({ data: body });
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

router.delete("/", (req, res, next) => {
  // ADMIN: Delete class. Waterfall delete all course sections, which should waterfall delete all registrations
});

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
    id: z.optional(z.string()),
    name: z.optional(z.string()),
    term: z.optional(z.nativeEnum(Term)),
    department: z.optional(z.nativeEnum(Department)),
    code: z.optional(z.number()),
    description: z.optional(z.string())
  });

  const body = schema.parse(req.body)

  console.log(body)

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

router.post("/:courseId/sections", async (req, res, next) => {
  // ADMIN: Create new course section
  const schema = z.object({
    id: z.string(),
    meetings: z.array(z.object({
      daysOfWeek: z.array(z.nativeEnum(DaysOfWeek)),
      startTime: z.string().datetime(),
      endTime: z.string().datetime(),
      location: z.string()
    })),
    instructorId: z.string(),
  });

  const body = schema.parse(req.body)

  const courseSection = Object.assign(  
    { courseId:req.params.courseId },
    body
  )

  try {
    await client.courseSection.create({ data: courseSection });
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

router.get("/:courseId/sections/:sectionId", (req, res, next) => {
  // ALL: Get course section information
  // INSTRUCTOR/ADMIN: Also fetch associated registrations, parsing results
});

router.delete("/:courseId/sections/:sectionId", (req, res, next) => {
  // ADMIN: Delete course section
});

router.put("/:courseId/sections/:sectionId", (req, res, next) => {
  // ADMIN: Update section information
});

router.post(
  "/:courseId/sections/:sectionId/registrations",
  (req, res, next) => {
    // STUDENT: Register for course
  }
);

export default router;
