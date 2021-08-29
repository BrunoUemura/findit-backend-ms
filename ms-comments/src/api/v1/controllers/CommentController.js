const CommentsService = require("../services/CommentsService");
const { StatusCodes } = require("http-status-codes");

class ChatController {
  static async showAllComments(req, res) {
    const { id } = req.params;
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

  static async createComment(req, res) {
    const { id } = req.params;
    const { sender_id, comment } = req.body;
    const commentsService = new CommentsService();

    try {
      const commentResponse = await commentsService.createComment(
        { sender_id, comment },
        id
      );
      return res.json(commentResponse);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }
}

module.exports = ChatController;
