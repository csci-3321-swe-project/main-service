import { z } from "zod";
import { Season } from "@prisma/client";
import { Router } from "express";
import client from "../utilities/client";
import authorize from "../middleware/authorize";
import { TimeRange } from "../utilities/time-range";

const router = Router();

// get all terms
router.get(
  "/",
  authorize(["ADMINISTRATOR", "PROFESSOR", "STUDENT"]),
  async (req, res, next) => {
    try {
      const terms = await client.term.findMany();

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
    const currentDate = new Date()
    try {
      const term = await client.term.findFirstOrThrow({
        where: { 
          startTime: {
            lt: currentDate
          },
          endTime : {
            gt: currentDate
          }
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
router.post(
  "/",
  authorize(["ADMINISTRATOR"]),
  async (req, res, next) => {
    const schema = z.object({
      season: z.nativeEnum(Season),
      year: z.string().regex(new RegExp(/\d{4}/)),
      startTime: z.string().datetime(),
      endTime: z.string().datetime(),
    })

    try {
      const body = schema.parse(req.body)
      if (new Date(body.startTime) >= new Date(body.endTime)) {
        res.sendStatus(400)
        return
      }
      const conflicts = await client.term.findMany({
        where: {
          OR: [
            {
              // end time is within the new term's start and end time
              endTime: {
                gt: body.startTime,
                lt: body.endTime
              }
            },
            {
              // start time is within the new term's start and end time
              startTime: {
                gt: body.startTime,
                lt: body.endTime
              }
            },
            {
              // new term is entirely within
              startTime: {
                lt: body.startTime
              },
              endTime: {
                gt: body.endTime
              }
            }
          ]
        }
      })

      if (conflicts.length == 0) {
        const term = await client.term.create({data: body})
        res.status(201).send(term)
      } else {
        res.sendStatus(400)
        return
      }
    } catch(err) {
      next(err)
    }
})

// update term
router.put("/:termId", authorize(["ADMINISTRATOR"]), async (req, res, next) => {
  const schema = z.object({
    season: z.nativeEnum(Season).optional(),
    year: z.string().regex(new RegExp(/\d{4}/)).optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
  })

  try {
    const body = schema.parse(req.body)
    const term = await client.term.findUniqueOrThrow({
      where: { id: req.params.termId }
    })
    const {id, ...data} = {
      ...term,
      ...body,
    }

    if (new Date(data.startTime) >= new Date(data.endTime)) {
      res.sendStatus(400)
      return
    }

    const conflicts = await client.term.findMany({
      where: {
        OR: [
          {
            // end time is within the new term's start and end time
            endTime: {
              gt: data.startTime,
              lt: data.endTime
            }
          },
          {
            // start time is within the new term's start and end time
            startTime: {
              gt: data.startTime,
              lt: data.endTime
            }
          },
          {
            // new term is entirely within
            startTime: {
              lt: data.startTime
            },
            endTime: {
              gt: data.endTime
            }
          }
        ],
        NOT: {
          id: req.params.termId
        },
      }
    })

    if (conflicts.length == 0) {
      const updatedTerm = await client.term.update({
        where: { id: req.params.termId },
        data: data
      })
      res.status(200).send(updatedTerm)
    } else {
      res.sendStatus(400)
    }
  } catch(err) {
    next(err)
  }
})

// delete term
router.delete(
  "/:termId",
  authorize(["ADMINISTRATOR"]),
  async (req, res, next) => {
    try {
      const deletedTerm = await client.term.delete({
        where: {
          id: req.params.termId
        },
      });

      res.status(200).send(deletedTerm);
    } catch (err) {
      next(err);
    }
  }
);

export default router;