const { Router } = require("express");
const AuthController = require("../controllers/AuthController");

const auth = Router();

// ROUTES
auth.post("/auth/register", AuthController.registerUser);
auth.get("/auth/email-confirmation/:id", AuthController.confirmRegistration);
auth.post("/auth/login", AuthController.loginUser);
auth.post("/auth/logout", AuthController.logoutUser);

module.exports = auth;
