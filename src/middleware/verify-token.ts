import { RequestHandler } from "express";
import client from "../utilities/client";
import { parse } from "../utilities/tokens";

const verifyToken: RequestHandler = async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (!bearerHeader) {
    res.sendStatus(401);
    return;
  }

  // Verify token
  const [identifier, token] = bearerHeader.split(" ");

  if (identifier !== "Bearer") {
    res.sendStatus(401);
    return;
  }

  const payload = parse(token);

  // Attach user object to request data
  res.locals.user = await client.user.findUnique({
    where: { email: payload.email },
  });

  next();
};

export default verifyToken;
