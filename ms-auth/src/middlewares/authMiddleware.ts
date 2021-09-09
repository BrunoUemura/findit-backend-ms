import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import blacklist from "./handleBlacklist";
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
    const tokenInBlacklist = await blacklist.tokenExists(token);

    if (tokenInBlacklist) {
      throw new UnauthorizedError("Token invalid due to logout");
    }

    jwt.verify(token, process.env.JWT_SECRET);

    return next();
  } catch (error) {
    next(error);
  }
};
