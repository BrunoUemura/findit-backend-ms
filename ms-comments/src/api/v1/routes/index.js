const { Router } = require("express");
const comments = require("./comments.routes");

const routes = Router();

// ROUTES
routes.get("/api/v1", (_, res) => {
  res.send({ message: "You are in the backend API" });
});

routes.use("/api/v1", comments);

module.exports = routes;
