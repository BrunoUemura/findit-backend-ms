const ChatService = require("../services/ChatService");
const { StatusCodes } = require("http-status-codes");
const path = require("path");

class ChatController {
  static async showAllChatRooms(req, res) {
    const chatService = new ChatService();

    try {
      const chats = await chatService.showAllChatRooms();
      return res.json(chats);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  static async showAllChatRoomsById(req, res) {
    const { id } = req.params;
    const chatService = new ChatService();

    try {
      const chats = await chatService.showAllChatRoomsById(id);
      return res.json(chats);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  static async showAllChatRoomsByUser(req, res) {
    const { id } = req.params;
    const chatService = new ChatService();

    try {
      const chats = await chatService.showAllChatRoomsByUser(id);
      return res.json(chats);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  static async showAllMessages(req, res) {
    const { id } = req.params;
    const chatService = new ChatService();

    try {
      const messages = await chatService.showAllMessages(id);
      return res.json(messages);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  static async createChatRoom(req, res) {
    const chatInfo = req.body;
    const chatService = new ChatService();

    try {
      const messages = await chatService.createChatRoom(chatInfo);
      return res.json(messages);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  static async sendMessage(req, res) {
    const { id } = req.params;
    const { sender_id, content } = req.body;
    const chatService = new ChatService();

    try {
      const messages = await chatService.sendMessage(
        { sender_id, content },
        id
      );
      return res.json(messages);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }
}

module.exports = ChatController;
