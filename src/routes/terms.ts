import { Season } from "@prisma/client";
import { Router } from "express";
import { z } from "zod";
import authorize from "../middleware/authorize";
import client from "../utilities/client";

const router = Router();

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

      res.status(200).send(deletedTerm);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
