import { Router, Request, Response } from "express";
import "express-async-errors";
import swaggerUI from "swagger-ui-express";
import * as swaggerDoc from "../config/swagger-config.json";
import { NotFoundError } from "../errors/NotFoundError";

import { auth } from "./auth.routes";

export const routes = Router();

routes
  .get("/", (_: Request, res: Response) => {
    res.send({ message: "You are in the Auth API" });
  })
  .use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc))
  .use("/api", auth)
  .all("*", async () => {
    throw new NotFoundError("Route not found");
  });
