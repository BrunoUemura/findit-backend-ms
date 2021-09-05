import { Request, Response } from "express";
import { CommentsService } from "../services/CommentsService";
import { StatusCodes } from "http-status-codes";

export class CommentsController {
  static async showAllComments(req: Request, res: Response) {
    const { id } = req.params;
    console.log(id);

    const commentsService = new CommentsService();

    try {
      const comments = await commentsService.showAllComments(id);
      return res.json(comments);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  static async createComment(req: Request, res: Response) {
    const { id } = req.params;
    const commentInfo = req.body;
    const commentsService = new CommentsService();

    try {
      const commentResponse = await commentsService.createComment(
        id,
        commentInfo
      );
      return res.json(commentResponse);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }
}
