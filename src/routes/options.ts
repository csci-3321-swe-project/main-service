import { DayOfWeek, Department, Role, Season } from "@prisma/client";
import { Router } from "express";
import options from "../utilities/options";

const router = Router();

/**
 * @openapi
 * /options:
 *  get:
 *    tags:
 *      - Option
 *    summary: "Gets all the options."
 *    description: "Goes through each enum in the prisma schima to get all of the options for each of them."
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/options'
 *      404:
 *        description: "Server not found"
 */

router.get("/", (_, res) => {
  res.status(200).send({
    seasons: options(Season),
    roles: options(Role),
    departments: options(Department),
    daysOfWeek: options(DayOfWeek),
  });
});

export default router;
