const jwt = require("jsonwebtoken");
const database = require("../database/models");
const NotFound = require("../errors/NotFound");
require("dotenv").config();

class CommentsService {
  async showAllComments(id) {
    return await database.Comments.findAll({
      where: { service_id: id },
      include: {
        model: database.Users,
        as: "User",
      },
    });
  }

  async createComment({ sender_id, comment }, id) {
    // Check if Service exists
    const serviceExists = await database.Services.findOne({ where: { id } });
    if (!serviceExists) {
      throw new NotFound("Service associated");
    }

    // Post Comment
    const response = await database.Comments.create({
      service_id: id,
      sender_id,
      comment,
    });
    return { message: `Comment ${response.id} posted successfully!` };
  }
}

module.exports = CommentsService;
