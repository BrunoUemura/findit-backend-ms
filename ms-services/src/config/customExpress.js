const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const routes = require("../api/v1/routes");
require("./redis");

const customExpress = () => {
  const app = express();

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

  return app;
};

module.exports = customExpress;
