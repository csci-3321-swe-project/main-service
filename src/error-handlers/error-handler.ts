import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Handle input validation errors
  if (err instanceof ZodError) {
    res.status(400).send(err.issues);
    return;
  }

  // Handle database errors
  if (
    err instanceof PrismaClientKnownRequestError ||
    err instanceof PrismaClientValidationError
  ) {
    res.status(400).send("Invalid request.");
    return;
  }

  // Otherwise, pass to default error handler
  next(err);
};

export default errorHandler;
