const { Router } = require("express");
const auth = require("./auth.routes");
const users = require("./users.routes");

const routes = Router();

// ROUTES
routes.get("/api/v1", (_, res) => {
  res.send({ message: "You are in the backend API" });
});
1;
routes.use("/api/v1", auth, users);

module.exports = routes;
