import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../errors/UnauthorizedError";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new UnauthorizedError("Missing JWT token");
    }

    const token = authorization.replace("Bearer", "").trim();

    jwt.verify(token, process.env.JWT_SECRET);

    return next();
  } catch (error) {
    next(error);
  }
};
