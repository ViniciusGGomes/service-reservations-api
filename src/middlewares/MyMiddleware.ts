import { Request, Response, NextFunction } from "express";
import { randomUUID, UUID } from "node:crypto";

export function MyMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  request.user_id = randomUUID();

  return next();
}
