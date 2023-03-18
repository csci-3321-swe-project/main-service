import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Log error for visibility
  console.error(err);

  // Handle input validation errors
  if (err instanceof ZodError) {
    res.status(400).send(err.issues);
    return;
  }

  // Request errors
  if (err instanceof PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2025":
        res.sendStatus(404);
        break;
      default:
        res.sendStatus(400);
    }
  }

  // Validation errors
  if (err instanceof PrismaClientValidationError) {
    res.sendStatus(400);
  }

  // Otherwise, pass to default error handler
  next(err);
};

export default errorHandler;
