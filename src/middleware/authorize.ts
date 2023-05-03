import { Role } from "@prisma/client";
import { RequestHandler } from "express";
import client from "../utilities/client";
import { parse } from "../utilities/tokens";

const authorize = (roles: Role[]) => {
  const middleware: RequestHandler = async (req, res, next) => {
    // Parse token from headers
    const header = req.headers["authorization"];

    if (!header) {
      res.sendStatus(401);
      return;
    }

    const [identifier, token] = header.split(" ");

    if (identifier !== "Bearer") {
      res.sendStatus(401);
      return;
    }

    // Verify token
    const payload = parse(token);

    // Attach user object to request data
    const user = await client.user.findUnique({
      where: { id: payload.userId },
      include: {
        registrations: {
          include: {
            courseSection: { include: { course: { include: { term: true } } } },
          },
        },
      },
    });

    if (!user) {
      res.sendStatus(401);
      return;
    }

    res.locals.user = user;

    // Check user roles against required roles
    if (!roles.includes(user.role)) {
      res.sendStatus(401);
      return;
    }

    next();
  };

  return middleware;
};

export default authorize;
