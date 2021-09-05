import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import blacklist from "./handleBlacklist";
import { MissingTokenJWT } from "../errors/MissingTokenJWT";
import { StatusCodes } from "http-status-codes";

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new MissingTokenJWT();
    }

    const token = authorization.replace("Bearer", "").trim();
    const tokenInBlacklist = await blacklist.tokenExists(token);

    if (tokenInBlacklist) {
      throw new jwt.JsonWebTokenError("Token invalid due to logout.");
    }

    jwt.verify(token, process.env.JWT_SECRET);

    return next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: error.message });
  }
};
