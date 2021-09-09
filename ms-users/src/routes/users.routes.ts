import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { UsersController } from "../controllers/UsersController";
import multer from "multer";
import { multerConfig } from "../config/multer";

export const users = Router();

users
  .get("/users", UsersController.showAllUsers)
  .get("/users/:id", UsersController.showOneUser)
  .get("/users/all/count", UsersController.showUsersCount)
  // .get(
  //   "/users/:id/completed-services/count",
  //   UsersController.showUserCompletedServicesCount
  // )
  .get("/users/:id/profile-image", UsersController.getProfileImage)
  .post(
    "/users/:id/profile-image/upload",
    authMiddleware,
    multer(multerConfig).single("file"),
    UsersController.uploadProfileImage
  )
  .put("/users/:id", authMiddleware, UsersController.updateUser)
  .delete("/users/:id", authMiddleware, UsersController.deleteUser);
