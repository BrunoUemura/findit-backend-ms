import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { CommentsService } from "../services/CommentsService";
import { StatusCodes } from "http-status-codes";
import { RequestValidationError } from "../errors/RequestValidationError";

export class CommentsController {
  static async showAllComments(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    console.log(id);

    const commentsService = new CommentsService();

    try {
      const comments = await commentsService.showAllComments(id);
      return res.json(comments);
    } catch (error) {
      next(error);
    }
  }

  static async createComment(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
      }

      const { id } = req.params;
      const commentInfo = req.body;
      const commentsService = new CommentsService();

      const commentResponse = await commentsService.createComment(
        id,
        commentInfo
      );
      return res.json(commentResponse);
    } catch (error) {
      next(error);
    }
  }

  static async deleteComment(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const commentsService = new CommentsService();
      const commentResponse = await commentsService.deleteComment(id);

      return res.json(commentResponse);
    } catch (error) {
      next(error);
    }
  }
}
