import { Router } from "express";
import { body } from "express-validator";
import { authMiddleware } from "../middlewares/authMiddleware";
import { CommentsController } from "../controllers/CommentsController";

export const comments = Router();

const commentValidation = [
  body("service_id").notEmpty(),
  body("sender_id").notEmpty(),
  body("comment").notEmpty(),
];

comments
  .get("/comments/:id", CommentsController.showAllComments)
  .post(
    "/comments/post-comment/:id",
    authMiddleware,
    commentValidation,
    CommentsController.createComment
  )
  .delete(
    "/comments/delete-comment/:id",
    authMiddleware,
    CommentsController.deleteComment
  );
