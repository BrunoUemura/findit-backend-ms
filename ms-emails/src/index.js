import express from "express";
import cors from "cors";
import logger from "morgan";
import routes from "./api/v1/routes/index.js";

const app = express();

const PORT = 4001;

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(routes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
