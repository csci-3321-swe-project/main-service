import { Role } from "@prisma/client";
import { RequestHandler } from "express";
import client from "../utilities/client";
import { parse } from "../utilities/tokens";

const authorize = (roles: Role[]) => {
  const middleware: RequestHandler = async (req, res, next) => {
    // Parse token from headers
    const bearerHeader = req.headers["authorization"];

    if (!bearerHeader) {
      res.sendStatus(401);
      return;
    }

    const [identifier, token] = bearerHeader.split(" ");

    if (identifier !== "Bearer") {
      res.sendStatus(401);
      return;
    }

    // Verify token
    const payload = parse(token);

    // Attach user object to request data
    const user = await client.user.findUnique({
      where: { email: payload.email },
    });

    if (!user) {
      res.sendStatus(401);
      return;
    }

    res.locals.user = user;

    // Check user roles against required roles
    if (!(user.role in roles)) {
      res.sendStatus(401);
      return;
    }

    next();
  };

  return middleware;
};

export default authorize;
