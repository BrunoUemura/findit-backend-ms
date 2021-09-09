import express from "express";
import cors from "cors";
import logger from "morgan";
import "./database";
import { routes } from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
import RabbitmqServer from "./rabbitmq-server";
import { RabbitmqService } from "./services/RabbitmqService";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(routes);
app.use(errorHandler);

const consumer = async () => {
  const server = new RabbitmqServer("amqp://admin:admin@localhost:5672");
  await server.start();
  await server.consume("user", (message) => {
    const userObject = JSON.parse(message.content.toString());
    const rabbitmqService = new RabbitmqService();
    rabbitmqService.createUser(userObject);
  });
};

consumer();
