import { Request, Response } from "express";
import { ChatsService } from "../services/ChatsService";
import { StatusCodes } from "http-status-codes";

export class ChatsController {
  static async showAllChatRooms(req: Request, res: Response) {
    const chatsService = new ChatsService();

    try {
      const chats = await chatsService.showAllChatRooms();
      return res.json(chats);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  static async showAllChatRoomsById(req: Request, res: Response) {
    const { id } = req.params;
    const chatsService = new ChatsService();

    try {
      const chats = await chatsService.showAllChatRoomsById(id);
      return res.json(chats);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  static async showAllChatRoomsByUser(req: Request, res: Response) {
    const { id } = req.params;
    const chatsService = new ChatsService();

    try {
      const chats = await chatsService.showAllChatRoomsByUser(id);
      return res.json(chats);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  static async showAllMessages(req: Request, res: Response) {
    const { id } = req.params;
    const chatsService = new ChatsService();

    try {
      const messages = await chatsService.showAllMessages(id);
      return res.json(messages);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  static async createChatRoom(req: Request, res: Response) {
    const chatInfo = req.body;
    const chatsService = new ChatsService();

    try {
      const messages = await chatsService.createChatRoom(chatInfo);
      return res.json(messages);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  static async sendMessage(req: Request, res: Response) {
    const { id } = req.params;
    const messageInfo = req.body;
    const chatsService = new ChatsService();

    try {
      const messages = await chatsService.sendMessage(id, messageInfo);
      return res.json(messages);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }
}
