import { Season } from "@prisma/client";
import { Router } from "express";
import { z } from "zod";
import authorize from "../middleware/authorize";
import client from "../utilities/client";

const router = Router();

/**
 * @openapi
 * /terms:
 *  get:
 *    tags:
 *      - Terms
 *    description: "Gets all of the terms in descending order of start times."
 *    summary: "Gets all of the terms."
 *    responses:
 *      200:
 *        description: "Retrived all the term successfully"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/termArray'
 *      401:
 *        description: "No authorization token"
 *      404:
 *        description: "Server not found"
 */

// get all terms
router.get(
  "/",
  authorize(["ADMINISTRATOR", "PROFESSOR", "STUDENT"]),
  async (req, res, next) => {
    try {
      const terms = await client.term.findMany({
        orderBy: { startTime: "desc" },
      });

      res.status(200).send(terms);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * @openapi
 * /terms/current:
 *  get:
 *    tags:
 *      - Terms
 *    summary: "Gets the current term"
 *    description: "Finds the current term based on the first term where the current date is in between the start and end dates."
 *    responses:
 *      200:
 *        description: "Returned the current term successfully"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/term'
 *      400:
 *        description: "No current term exists"
 *      401:
 *        description: "Invalid authorization token"
 *      404:
 *        description: "Server not found"
 */

// get current term
router.get(
  "/current",
  authorize(["ADMINISTRATOR", "PROFESSOR", "STUDENT"]),
  async (req, res, next) => {
    const currentDate = new Date();

    try {
      const term = await client.term.findFirstOrThrow({
        where: {
          startTime: {
            lt: currentDate,
          },
          endTime: {
            gt: currentDate,
          },
        },
      });

      res.status(200).send(term);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * @openapi
 * /terms/{termId}:
 *  get:
 *    tags:
 *      - Terms
 *    summary: "Gets the term based on Id"
 *    description: "Finds the unique term with the given id and returns it to the user."
 *    parameters:
 *      - name: termId
 *        in: path
 *        description: "The id of the term"
 *        required: true
 *        default: "pb3456tyu7801we56bop69x"
 *    responses:
 *      200:
 *        description: "Found term successfully"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/term'
 *      400:
 *        description: "Did not find term with given id"
 *      401:
 *        description: "Invalid authorization token"
 *      404:
 *        description: "Term id does not exist"
 */

// get specified term
router.get(
  "/:termId",
  authorize(["ADMINISTRATOR", "PROFESSOR", "STUDENT"]),
  async (req, res, next) => {
    try {
      const term = await client.term.findUniqueOrThrow({
        where: { id: req.params.termId },
      });

      res.status(200).send(term);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * @openapi
 * /terms:
 *  post:
 *    tags:
 *      - Terms
 *    summary: "Creates a new term"
 *    description: "Allows an admin user to create a new term that does not already exist and returns the newly created term."
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/termCreationInfo'
 *    responses:
 *      200:
 *        description: "Created the term succesfully"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/term'
 *      400:
 *        description: "The start times and end times are invalid, there exists a conflicting term, or invalid request body"
 *      401:
 *        description: "The user does not have admin authorization"
 *      404:
 *        description: "Server not found"
 */

// create new term
router.post("/", authorize(["ADMINISTRATOR"]), async (req, res, next) => {
  const schema = z.object({
    season: z.nativeEnum(Season),
    year: z.number().int().gte(999).lte(10000),
    startTime: z.coerce.date(),
    endTime: z.coerce.date(),
  });

  try {
    const body = schema.parse(req.body);
    if (body.startTime >= body.endTime) {
      res.sendStatus(400);
      return;
    }
    const conflicts = await client.term.findMany({
      where: {
        OR: [
          {
            // end time is within the new term's start and end time
            endTime: {
              gte: body.startTime,
              lte: body.endTime,
            },
          },
          {
            // start time is within the new term's start and end time
            startTime: {
              gte: body.startTime,
              lte: body.endTime,
            },
          },
          {
            // new term is entirely within
            startTime: {
              lte: body.startTime,
            },
            endTime: {
              gte: body.endTime,
            },
          },
        ],
      },
    });

    if (conflicts.length != 0) {
      res.sendStatus(400);
      return;
    }

    const term = await client.term.create({ data: body });
    res.status(201).send(term);
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /terms/{termId}:
 *  put:
 *    tags:
 *      - Terms
 *    summary: "Updates term based on id"
 *    description: "Allows user with admin authorization to update an existing term with the given id."
 *    parameters:
 *      - name: termId
 *        in: path
 *        description: "The id of the term"
 *        required: true
 *        default: "pb3456tyu7801we56bop69x"
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/termCreationInfo'
 *    responses:
 *      200:
 *        description: "Updated the term succesfully"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/term'
 *      400:
 *        description: "The start times and end times are invalid, there exists a conflicting term, or invalid request body"
 *      401:
 *        description: "The user does not have admin authorization"
 *      404:
 *        description: "Term id does not exist"        
 */

// update term
router.put("/:termId", authorize(["ADMINISTRATOR"]), async (req, res, next) => {
  const schema = z.object({
    season: z.nativeEnum(Season),
    year: z.number().int(),
    startTime: z.coerce.date(),
    endTime: z.coerce.date(),
  });

  try {
    const body = schema.parse(req.body);
    const term = await client.term.findUniqueOrThrow({
      where: { id: req.params.termId },
    });
    const { id, ...data } = {
      ...term,
      ...body,
    };

    if (new Date(data.startTime) >= new Date(data.endTime)) {
      res.sendStatus(400);
      return;
    }

    const conflicts = await client.term.findMany({
      where: {
        OR: [
          {
            // end time is within the new term's start and end time
            endTime: {
              gte: data.startTime,
              lte: data.endTime,
            },
          },
          {
            // start time is within the new term's start and end time
            startTime: {
              gte: data.startTime,
              lte: data.endTime,
            },
          },
          {
            // new term is entirely within
            startTime: {
              lte: data.startTime,
            },
            endTime: {
              gte: data.endTime,
            },
          },
        ],
        NOT: {
          id: req.params.termId,
        },
      },
    });

    if (conflicts.length != 0) {
      res.sendStatus(400);
      return;
    }

    const updatedTerm = await client.term.update({
      where: { id: req.params.termId },
      data: data,
    });
    res.status(200).send(updatedTerm);
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /term/{termId}:
 *  delete:
 *    tags:
 *      - Terms
 *    summary: "Deletes term based on id"
 *    description: "Allows user with admin authorization to delete an existing term with the given id"
 *    parameters:
 *      - name: termId
 *        in: path
 *        description: "The id of the term"
 *        required: true
 *        default: "pb3456tyu7801we56bop69x"
 *    responses:
 *      200:
 *        description: "Deleted the term succesfully"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/term' 
 *      500:
 *        description: "Term to delete not found"
 *      401:
 *        description: "The user does not have admin authorization"
 *      404:
 *        description: "Term id does not exist" 
 */

// delete term
router.delete(
  "/:termId",
  authorize(["ADMINISTRATOR"]),
  async (req, res, next) => {
    try {
      const deletedTerm = await client.term.delete({
        where: {
          id: req.params.termId,
        },
      });

      res.status(200).send({message: "Term deleted successfully", term: deletedTerm});

    } catch (err) {
      console.log(err);
      next(err);
    }
  }
);

export default router;
