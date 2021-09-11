import express from "express";
import cors from "cors";
import logger from "morgan";
import routes from "./routes/index.js";
import { rabbitmqConsumer } from "./middlewares/rabbitmqConsumer.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(routes);

rabbitmqConsumer();

export default app;
