import express from "express";
import cors from "cors";
import logger from "morgan";
import routes from "./routes/index.js";
import RabbitmqServer from "./config/rabbitmq-server.js";
import { RabbitmqController } from "./controllers/RabbitmqController.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(routes);

const consumer = async () => {
  const server = new RabbitmqServer("amqp://admin:admin@localhost:5672");
  await server.start();
  await server.consume("email", (message) => {
    const object = JSON.parse(message.content.toString());
    RabbitmqController.handleEvent(object);
  });
};

consumer();

export default app;
