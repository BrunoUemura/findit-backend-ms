import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

export const auth = Router();

auth
  .post("/auth/register", AuthController.registerUser)
  .get("/auth/email-confirmation/:id", AuthController.confirmRegistration)
  .post("/auth/login", AuthController.loginUser)
  .post("/auth/logout", AuthController.logoutUser);
