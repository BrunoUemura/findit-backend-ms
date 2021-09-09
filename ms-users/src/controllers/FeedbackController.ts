import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { FeedbacksService } from "../services/FeedbacksService";
import { RequestValidationError } from "../errors/RequestValidationError";

export class FeedbackController {
  static async showAllUsersFeedbacks(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const feedbacksService = new FeedbacksService();
      const feedbacks = await feedbacksService.showAllUsersFeedbacks();
      return res.json(feedbacks);
    } catch (error) {
      next(error);
    }
  }

  static async showUserFeedbacks(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const feedbacksService = new FeedbacksService();
      const feedbacks = await feedbacksService.showUserFeedbacks(id);
      return res.json(feedbacks);
    } catch (error) {
      next(error);
    }
  }

  static async showUserFeedback(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id, feedback_id } = req.params;
      const feedbacksService = new FeedbacksService();
      const feedback = await feedbacksService.showUserFeedback(id, feedback_id);
      return res.json(feedback);
    } catch (error) {
      next(error);
    }
  }

  static async showUserAverageFeedbacks(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const feedbacksService = new FeedbacksService();
      const averageFeedback = await feedbacksService.showUserAverageFeedbacks(
        id
      );
      return res.json(averageFeedback);
    } catch (error) {
      next(error);
    }
  }

  static async createUserFeedback(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
      }

      const { id } = req.params;
      const feedbackInfo = req.body;
      const feedbacksService = new FeedbacksService();
      const feedback = await feedbacksService.createUserFeedback(
        id,
        feedbackInfo
      );
      return res.json(feedback);
    } catch (error) {
      next(error);
    }
  }

  static async updateUserFeedback(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id, feedback_id } = req.params;
      const feedbackInfo = req.body;
      const feedbacksService = new FeedbacksService();
      const feedback = await feedbacksService.updateUserFeedback(
        id,
        feedback_id,
        feedbackInfo
      );
      return res.json(feedback);
    } catch (error) {
      next(error);
    }
  }
}
