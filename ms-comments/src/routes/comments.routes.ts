import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { CommentsController } from "../controllers/CommentsController";

export const comments = Router();

comments
  .get("/comments/:id", CommentsController.showAllComments)
  .post(
    "/comments/post-comment/:id",
    authMiddleware,
    CommentsController.createComment
  );
