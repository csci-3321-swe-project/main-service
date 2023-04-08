import { z } from "zod";
import { Season } from "@prisma/client";
import { Router } from "express";
import client from "../utilities/client";
import authorize from "../middleware/authorize";
import { TimeRange } from "../utilities/time-range";

const router = Router();

router.get(
  "/",
  authorize(["ADMINISTRATOR", "PROFESSOR", "STUDENT"]),
  async (req, res, next) => {
    try {
      const terms = await client.termModel.findMany();

      res.status(200).send(terms);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/:termId",
  authorize(["ADMINISTRATOR", "PROFESSOR", "STUDENT"]),
  async (req, res, next) => {
    try {
      const term = await client.termModel.findUniqueOrThrow({
        where: { id: req.params.termId },
      });

      res.status(200).send(term);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/",
  authorize(["ADMINISTRATOR"]),
  async (req, res, next) => {
    const schema = z.object({
      season: z.nativeEnum(Season),
      year: z.string().regex(new RegExp(/\d{4}/)),
      startTime: z.string(),
      endTime: z.string()
    })

    try {
      const body = schema.parse(req.body)
      if (Date.parse(body.startTime) >= Date.parse(body.endTime)) {
        res.sendStatus(400)
        return
      }
      const conflicts = await client.termModel.findMany({
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
        const term = await client.termModel.create({data: body})
        res.status(201).send(term)
      } else {
        res.sendStatus(400)
        return
      }
    } catch(err) {
      next(err)
    }
})

router.put("/:termId", authorize(["ADMINISTRATOR"]), async (req, res, next) => {
  const schema = z.object({
    season: z.nativeEnum(Season).optional(),
    year: z.string().regex(new RegExp(/\d{4}/)).optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
  })

  try {
    const body = schema.parse(req.body)
    const term = await client.termModel.findUniqueOrThrow({
      where: { id: req.params.termId }
    })
    const {id, ...data} = {
      ...term,
      ...body,
    }

    if (Date.parse(data.startTime) >= Date.parse(data.endTime)) {
      res.sendStatus(400)
      return
    }

    const conflicts = await client.termModel.findMany({
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
      const updatedTerm = await client.termModel.update({
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

export default router;