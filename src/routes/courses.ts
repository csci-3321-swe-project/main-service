import { DayOfWeek, Department } from "@prisma/client";
import { Router } from "express";
import { z } from "zod";
import authorize from "../middleware/authorize";
import client from "../utilities/client";
import queryArrayParam from "../utilities/query-param";
import { TimeRange } from "../utilities/time-range";


const router = Router();

/**
 * @openapi
 * /courses:
 *  get:
 *    tags:
 *      - Courses
 *    summary: "Gets the courses with given info"
 *    description: "Given a query, it will fetch all classes that fit the given description along with filtering by term and department."
 *    parameters:
 *      - name: q
 *        description: "The query for finding the class."
 *        in: query
 *        required: true
 *        default: "Software Engineering"
 *      - name: termId
 *        in: query
 *        description: "The id for the term the user wants the class to be in."
 *        default: "pb3456tyu7801we56bop69x"
 *      - name: dept
 *        in: query
 *        description: "The department the user wants the class to be a part of."
 *        default: "COMPUTER_SCIENCE"
 *    responses:
 *      200:
 *        description: "Courses gather successfully"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/courseList'
 *      400:
 *        description: "No query entered"
 *      404:
 *        description: "Server not found"
 */

router.get(
  "/",
  authorize(["ADMINISTRATOR", "PROFESSOR", "STUDENT"]),
  async (req, res, next) => {
    const schema = z.object({
      q: queryArrayParam(z.string()),
      termId: z.string().optional(),
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
          termId: query.termId,
          department: query.dept,
        },
      });

      res.status(200).send(courses);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * @openapi
 * /courses:
 *  post:
 *    tags:
 *      - Courses
 *    summary: "Creates a course"
 *    description: "Allows users with admin authorization to create a course given certain parameters."
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/courseCreationInfo'
 *    responses:
 *      201:
 *        description: "Created the course successfuly"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/course'
 *      400:
 *        description: "Invalid request body"
 *      401:
 *        description: "Non admin authorization"
 *      404:
 *        description: "Server not found"
 */

// Create Course
router.post("/", authorize(["ADMINISTRATOR"]), async (req, res, next) => {
  const schema = z.object({
    name: z.string(),
    termId: z.string(),
    department: z.nativeEnum(Department),
    code: z.number(),
    description: z.string(),
  });
  const currentTime = (new Date()).toString()
  try {
    const body = schema.parse(req.body);
    const newCourse = await client.course.create({ data: {
      createdById: res.locals.user.id,
      createdOn: currentTime,
      updatedByIds: [res.locals.user.id],
      updatedOnTimes: [currentTime],
      ...body 
    }
    });

    res.status(201).send(newCourse);
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /courses/{courseId}:
 *  get:
 *    tags:
 *      - Courses
 *    summary: "Gets course based on Id"
 *    description: "Given the couse id, this will fetch the course with the id."
 *    parameters:
 *      - name: courseId
 *        in: path
 *        required: true
 *        default: "64248ad776ebc32a873efdc0"
 *    responses:
 *      200:
 *        description: "Course fetched successfuly"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/course'
 *      400:
 *        descripton: "Unique course not found"
 *      401:
 *        descripton: "Invalid authorization token"
 *      404:
 *        description: "Id does not exist"
 */

// Get Course
router.get(
  "/:courseId",
  authorize(["ADMINISTRATOR", "PROFESSOR", "STUDENT"]),
  async (req, res, next) => {
    try {
      const course = await client.course.findUniqueOrThrow({
        where: { id: req.params.courseId },
        include: {
          courseSections: { include: { instructors: true } },
          term: true,
        },
      });

      res.status(200).send(course);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * @openapi
 * /courses/{courseId}:
 *  put:
 *    tags:
 *      - Courses
 *    summary: "Updates course based on id"
 *    description: "Allows users with admin authorization to update the course with the given id."
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/courseCreationInfo'
 *    parameters:
 *      - name: courseId
 *        in: path
 *        required: true
 *        default: "64248ad776ebc32a873efdc0"
 *    responses:
 *      200:
 *        description: "Course updated successfuly"
 *        content:
 *          applicaton/json:
 *            schema:
 *              $ref: '#/components/schemas/course'
 *      400:
 *        description: "Invalid request body"
 *      401:
 *        description: "Non admin authorization"
 *      404:
 *        description: "Id does not exist"
 */

// Update Course
router.put(
  "/:courseId",
  authorize(["ADMINISTRATOR"]),
  async (req, res, next) => {
    const schema = z.object({
      name: z.optional(z.string()),
      termId: z.optional(z.string()),
      department: z.optional(z.nativeEnum(Department)),
      code: z.optional(z.number()),
      description: z.optional(z.string()),
    });

    const currentTime = (new Date()).toString()
    try {
      const body = schema.parse(req.body);
      const updatedCourse = await client.course.update({
        where: { id: req.params.courseId },
        data: {
          updatedByIds: {
            push: res.locals.user.id
          },
          updatedOnTimes: {
            push: currentTime
          },
          ...body
        }
      });

      res.status(200).send(updatedCourse);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * @openapi
 * /courses/{courseId}:
 *  delete:
 *    tags:
 *      - Courses
 *    summary: "Deletes course based on id"
 *    description: "Allows users with admin authorization to delete a course with the given id."
 *    parameters:
 *      - name: courseId
 *        in: path
 *        required: true
 *        default: "64248ad776ebc32a873efdc0"
 *    responses:
 *      200:
 *        description: "Course deleted successfuly"
 *        content:
 *          application/json:
 *            schema: 
 *              $ref: "#/components/schemas/courseDeletionTransaction"
 *      401:
 *        description: "Non admin authorization"
 *      404:
 *        description: "Id does not exist"
 *      500:
 *        description: "Course does not exist"
 */

// Delete Course
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

/**
 * @openapi
 * /courses/{courseId}/sections:
 *  post:
 *    tags:
 *      - Sections
 *    summary: "Creates course section"
 *    description: "Allows users with admin authorization to create a section of a course."
 *    parameters:
 *      - name: courseId
 *        in: path
 *        required: true
 *        default: "64248ad776ebc32a873efdc0"
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/sectionCreationInfo'
 *    responses:
 *      201:
 *        description: "Section created successfuly"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/section'
 *      400:
 *        description: "Invalid request body or invalid time range"
 *      401:
 *        description: "Non admin authorization"
 *      404:
 *        description: "Course Id does not exist"
 */

// Create Course Section 
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
    const currentTime = (new Date()).toString()
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
          
          //Course Section Audit attributes
          sectionCreatedById: res.locals.user.id,
          sectionCreatedOn: currentTime,
          sectionUpdatedByIds: [res.locals.user.id],
          sectionUpdatedOnTimes: [currentTime],
          ...body,
        },
      });

      res.status(201).send(newCourseSection);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * @openapi
 * /courses/{courseId}/sections/{sectionId}:
 *  get:
 *    tags:
 *      - Sections
 *    summary:  "Gets the section based on id"
 *    description: "Allows users with adim authorization to get the course section with the corresponding id."
 *    parameters:
 *      - name: courseId
 *        in: path
 *        required: true
 *        default: "64248ad776ebc32a873efdc0"
 *      - name: sectionId
 *        in: path
 *        required: true
 *        default: "4423"
 *    responses:
 *      200:
 *        description: "Retrieved the section successfully"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/section'
 *      401:
 *        description: "Non adim authorization"
 *      404:
 *        description: "Course id or section id does not exist"
 *      500: 
 *        description: "Unique course does not exist"
 */

// Get Course Section
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

/**
 * @openapi
 * /courses/{courseId}/sections/{sectionId}:
 *  delete:
 *    tags:
 *      - Sections
 *    summary:  "Deletes the section based on id"
 *    description: "Allows users with adim authorization to delete the course section with the corresponding id."
 *    parameters:
 *      - name: courseId
 *        in: path
 *        required: true
 *        default: "64248ad776ebc32a873efdc0"
 *      - name: sectionId
 *        in: path
 *        required: true
 *        default: "4423"
 *    responses:
 *      200:
 *        description: "Section deleted successfuly"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/sectionDeletionTransaction'
 *      401:
 *        description: "Non adim authorization"
 *      404:
 *        description: "Course id or section id does not exist"
 *      500:
 *        description: "Section does not exist"
 */

// Delete Course Section
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

/**
 * @openapi
 * /courses/{courseId}/sections/{sectionId}:
 *  put:
 *    tags:
 *      - Sections
 *    summary:  "Updates the section based on id"
 *    description: "Allows users with adim authorization to update the course section with the corresponding id."
 *    parameters:
 *      - name: courseId
 *        in: path
 *        required: true
 *        default: "64248ad776ebc32a873efdc0"
 *      - name: sectionId
 *        in: path
 *        required: true
 *        default: "4423"
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/sectionCreationInfo'
 *    responses:
 *      200:
 *        description: "Section updated successfuly"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/section'
 *      400:
 *        description: "Invalid request body or invalid time range"
 *      401:
 *        description: "Non adim authorization"
 *      404:
 *        description: "Course id or section id does not exist"
 *      500:
 *        description: "Section does not exist"
 */

// Update Course Section
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
      const currentTime = (new Date()).toString()
      const updatedCourseSection = await client.courseSection.update({
        where: { id: req.params.sectionId },
        data: {
          sectionUpdatedByIds: {
            push: res.locals.user.id
          },
          sectionUpdatedOnTimes: {
            push: currentTime,
          },
          ...body,
        },
      });

      res.status(201).send(updatedCourseSection);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * @openapi
 * /courses/{courseId}/sections/{sectionId}/roster:
 *  get:
 *    tags:
 *      - Roster
 *    summary: "Gets the roster for a section"
 *    description: "Gets all the users registered for a section, both fully registered and waitlisted."
 *    parameters:
 *      - name: courseId
 *        in: path
 *        required: true
 *        default: "64248ad776ebc32a873efdc0"
 *      - name: sectionId
 *        in: path
 *        required: true
 *        default: "4423"
 *    responses:
 *      200:
 *        description: "Fetched the roster successfuly"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/roster'
 *      401:
 *        description: "Invalid authorization token"
 *      404:
 *        description: "Server not found"
 *      500:
 *        description: "Unique section does not exist"
 */

// Get Registrations
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

/**
 * @openapi
 * /courses/{courseId}/sections/{sectionId}/registrations:
 *  post:
 *    tags:
 *      - Registrations
 *    summary: "Create a registration for a section"
 *    description: "User can register for themselves or another user for a section."
 *    parameters:
 *      - name: courseId
 *        in: path
 *        required: true
 *        default: "64248ad776ebc32a873efdc0"
 *      - name: sectionId
 *        in: path
 *        required: true
 *        default: "4423"
 *      - name: userId
 *        in: cookies
 *        required: true
 *        default: "642486eb76ebc32a07efbde"
 *    responses:
 *      200:
 *        description: "Registration created successfully"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/registration'
 *      400:
 *        description: "Registered for the course in a different section"
 *      401:
 *        description: "Invalid authorization token"
 *      404:
 *        description: "Server not available"
 */

// Create Registration
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
      const currentTime = (new Date()).toString()
      const newRegistration = await client.registration.create({
        data: {
          courseSectionId,
          userId,
          registeredById: res.locals.user.id,
          registeredOn: currentTime,
        },
        include: { user: true },
      });

      res.status(201).send(newRegistration);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * @openapi
 * /courses/{courseId}/sections/{sectionId}/registrations/{registrationId}:
 *  put:
 *    tags:
 *      - Registrations
 *    summary: "Update the priority of a registration"
 *    description: "Allows users with admin or professor authorization to change the priority status of a registration."
 *    parameters:
 *      - name: courseId
 *        in: path
 *        required: true
 *        default: "64248ad776ebc32a873efdc0"
 *      - name: sectionId
 *        in: path
 *        required: true
 *        default: "4423"
 *      - name: registrationId
 *        in: path
 *        required: true
 *        default: "n35ing450jw05gi42tg"
 *      - name: userId
 *        in: cookies
 *        required: true
 *        default: "642486eb76ebc32a07efbde"
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required: priority
 *            properties:
 *              priority:
 *                type: Boolean
 *                default: false
 *              
 *    responses:
 *      200:
 *        description: "Registration created successfully"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/registration'              
 *      400:
 *        description: "Registered for the course in a different section"
 *      401:
 *        description: "Invalid authorization token"
 *      404:
 *        description: "Server not available"
 */

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

/**
 * @openapi
 * /courses/{courseId}/sections/{sectionId}/registrations:
 *  delete:
 *    tags:
 *      - Registrations
 *    summary: "Update the priority of a registration"
 *    description: "Allows users with admin or professor authorization to change the priority status of a registration."
 *    parameters:
 *      - name: courseId
 *        in: path
 *        required: true
 *        default: "64248ad776ebc32a873efdc0"
 *      - name: sectionId
 *        in: path
 *        required: true
 *        default: "4423"
 *      - name: userId
 *        in: cookies
 *        required: true
 *        default: "642486eb76ebc32a07efbde" 
 *    responses:
 *      200:
 *        description: "Registration deleted successfully"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/registrationList'
 *      401:
 *        description: "Invalid authorization token"
 *      404:
 *        description: "Server not available"
 */

// Delete Registrations

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
