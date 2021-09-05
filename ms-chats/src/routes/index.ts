import { Router, Request, Response } from "express";
import swaggerUI from "swagger-ui-express";
import * as swaggerDoc from "../config/swagger-config.json";

import { chats } from "./chats.routes";

export const routes = Router();

routes
  .get("/", (req: Request, res: Response) => {
    res.send({ message: "You are in the backend API" });
  })
  .use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc))
  .use("/api", chats);
