import express from "express";
import cors from "cors";
import logger from "morgan";
import "./database";
import { routes } from "./routes";
import { errorHandler } from "./middlewares/errorHandler";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(routes);

app.use(errorHandler);
