import { Router } from "express";
import authorize from "../middleware/authorize";

const router = Router();
/**
 * @openapi
 * /account:
 *  get:
 *    tags:
 *      - Account
 *    summary: "Gets the account for a user"
 *    description: "Takes the users authorization token, parses the toke into an email and checks if an account with that email exists, returning the account if it does."
 *    responses:
 *      200:
 *        description: "The account with the given email exists"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/user'
 *      401:
 *        description: "The account does not exist, the user does not have a authorization token, or the account has an invalid role"
 *      404:
 *        description: "Server not found"
 */

router.get(
  "/",
  authorize(["ADMINISTRATOR", "PROFESSOR", "STUDENT"]),
  (_, res) => {
    res.send(res.locals.user);
  }
);

export default router;
