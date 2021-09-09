import { Router } from "express";
import { body } from "express-validator";
import { authMiddleware } from "../middlewares/authMiddleware";
import { FeedbackController } from "../controllers/FeedbackController";

export const feedbacks = Router();

const feedbackValidation = [
  body("user_id").notEmpty(),
  body("reviewer_id").notEmpty(),
  body("score").notEmpty(),
];

feedbacks
  .get("/users/all/feedbacks", FeedbackController.showAllUsersFeedbacks)
  .get("/users/:id/feedbacks", FeedbackController.showUserFeedbacks)
  .get("/users/:id/feedback/:feedback_id", FeedbackController.showUserFeedback)
  .get(
    "/users/:id/feedbacks/average",
    FeedbackController.showUserAverageFeedbacks
  )
  .post(
    "/users/:id/send-feedback",
    authMiddleware,
    feedbackValidation,
    FeedbackController.createUserFeedback
  )
  .put(
    "/users/:id/update-feedback/:feedback_id",
    authMiddleware,
    FeedbackController.updateUserFeedback
  );
