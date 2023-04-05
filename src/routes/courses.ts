import { DayOfWeek, Department, Term } from "@prisma/client";
import { Router } from "express";
import { z } from "zod";
import authorize from "../middleware/authorize";
import client from "../utilities/client";
import queryArrayParam from "../utilities/query-param";
import { TimeRange } from "../utilities/time-range";

const router = Router();

router.get(
  "/",
  authorize(["ADMINISTRATOR", "PROFESSOR", "STUDENT"]),
  async (req, res, next) => {
    const schema = z.object({
      q: queryArrayParam(z.string()),
      term: z.nativeEnum(Term).optional(),
      dept: z.nativeEnum(Department).optional(),
    });

    try {
      const query = schema.parse(req.query);
      const courses = await client.course.findMany({
        where: {
          OR: query.q.map((q) => ({
            OR: [
              {
                name: {
                  contains: q,
                  mode: "insensitive",
                },
              },
              {
                description: {
                  contains: q,
                  mode: "insensitive",
                },
              },
            ],
          })),
          term: query.term,
          department: query.dept,
        },
      });

      res.status(200).send(courses);
    } catch (err) {
      next(err);
    }
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
        include: { courseSections: { include: { instructors: true } } },
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

router.delete(
  "/:courseId",
  authorize(["ADMINISTRATOR"]),
  async (req, res, next) => {
    try {
      const deleteRegistrations = client.registration.deleteMany({
        where: { courseSection: { courseId: req.params.courseId } },
      });
      const deleteCourseSections = client.courseSection.deleteMany({
        where: { courseId: req.params.courseId },
      });
      const deleteCourse = client.course.delete({
        where: { id: req.params.courseId },
      });

      const transaction = await client.$transaction([
        deleteRegistrations,
        deleteCourseSections,
        deleteCourse,
      ]);

      res.status(200).send(transaction);
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
      capacity: z.number().min(1),
      meetings: z
        .array(
          z.object({
            daysOfWeek: z.array(z.nativeEnum(DayOfWeek)).nonempty(),
            startTime: z.string(),
            endTime: z.string(),
            location: z.string(),
          })
        )
        .nonempty(),
    });

    try {
      const body = schema.parse(req.body);

      // Check that end time is after start time
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
  authorize(["ADMINISTRATOR"]),
  async (req, res, next) => {
    try {
      const courseSection = await client.courseSection.findUniqueOrThrow({
        where: { id: req.params.sectionId },
        include: { instructors: true, course: true },
      });

      res.status(200).send(courseSection);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/:courseId/sections/:sectionId",
  authorize(["ADMINISTRATOR"]),
  async (req, res, next) => {
    try {
      const deleteRegistrations = client.registration.deleteMany({
        where: { courseSectionId: req.params.sectionId },
      });
      const deleteCourseSection = client.courseSection.delete({
        where: { id: req.params.sectionId },
      });
      const transaction = await client.$transaction([
        deleteRegistrations,
        deleteCourseSection,
      ]);

      res.status(200).send(transaction);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/:courseId/sections/:sectionId",
  authorize(["ADMINISTRATOR"]),
  async (req, res, next) => {
    const schema = z.object({
      instructorIds: z.array(z.string()).nonempty(),
      capacity: z.number().min(1),
      meetings: z
        .array(
          z.object({
            daysOfWeek: z.array(z.nativeEnum(DayOfWeek)).nonempty(),
            startTime: z.string(),
            endTime: z.string(),
            location: z.string(),
          })
        )
        .nonempty(),
    });

    try {
      const body = schema.parse(req.body);

      // Check that end time is after start time
      for (const meeting of body.meetings) {
        if (!new TimeRange({ ...meeting }).isValid) {
          res.sendStatus(400);
          return;
        }
      }

      const updatedCourseSection = await client.courseSection.update({
        where: { id: req.params.sectionId },
        data: {
          ...body,
        },
      });

      res.status(201).send(updatedCourseSection);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/:courseId/sections/:sectionId/roster",
  authorize(["ADMINISTRATOR", "PROFESSOR", "STUDENT"]),
  async (req, res, next) => {
    try {
      const courseSectionId = req.params.sectionId;

      const courseSection = await client.courseSection.findUniqueOrThrow({
        where: { id: courseSectionId },
      });

      const registrations = await client.registration.findMany({
        where: { courseSectionId },
        include: { user: true },
        orderBy: [{ priority: "desc" }, { createdAt: "asc" }],
      });

      const students = registrations.slice(0, courseSection.capacity);
      const waitlist = registrations.splice(courseSection.capacity);
      const roster = { students, waitlist };

      res.status(200).send(roster);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/:courseId/sections/:sectionId/registrations",
  authorize(["STUDENT", "PROFESSOR", "ADMINISTRATOR"]),
  async (req, res, next) => {
    try {
      const courseSectionId = req.params.sectionId;
      const userId = res.locals.user.id;

      const sameCourseDifferentSectionRegistrations =
        await client.registration.findMany({
          where: {
            userId,
            courseSection: {
              course: { courseSections: { some: { id: courseSectionId } } },
            },
          },
        });

      if (sameCourseDifferentSectionRegistrations.length) {
        res.sendStatus(400);
        return;
      }

      const newRegistration = await client.registration.create({
        data: {
          courseSectionId,
          userId,
        },
        include: { user: true },
      });

      res.status(201).send(newRegistration);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/:courseId/sections/:sectionId/registrations/:registrationId",
  authorize(["PROFESSOR", "ADMINISTRATOR"]),
  async (req, res, next) => {
    const schema = z.object({
      priority: z.boolean(),
    });

    try {
      const body = schema.parse(req.body);

      const updatedRegistration = await client.registration.update({
        where: { id: req.params.registrationId },
        data: {
          ...body,
        },
        include: { user: true },
      });

      res.status(201).send(updatedRegistration);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/:courseId/sections/:sectionId/registrations",
  authorize(["STUDENT", "PROFESSOR", "ADMINISTRATOR"]),
  async (req, res, next) => {
    try {
      const courseSectionId = req.params.sectionId;
      const userId = res.locals.user.id;

      const deletedRegistration = await client.registration.deleteMany({
        where: {
          courseSectionId,
          userId,
        },
      });

      res.status(200).send(deletedRegistration);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
