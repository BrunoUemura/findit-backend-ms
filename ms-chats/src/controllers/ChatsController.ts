import { NextFunction, Request, Response } from "express";
import { ChatsService } from "../services/ChatsService";
import { StatusCodes } from "http-status-codes";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../errors/RequestValidationError";

export class ChatsController {
  static async showAllChatRooms(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const chatsService = new ChatsService();

    try {
      const chats = await chatsService.showAllChatRooms();
      return res.json(chats);
    } catch (error) {
      next(error);
    }
  }

  static async showAllChatRoomsById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    const chatsService = new ChatsService();

    try {
      const chats = await chatsService.showAllChatRoomsById(id);
      return res.json(chats);
    } catch (error) {
      next(error);
    }
  }

  static async showAllChatRoomsByUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    const chatsService = new ChatsService();

    try {
      const chats = await chatsService.showAllChatRoomsByUser(id);
      return res.json(chats);
    } catch (error) {
      next(error);
    }
  }

  static async showAllMessages(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    const chatsService = new ChatsService();

    try {
      const messages = await chatsService.showAllMessages(id);
      return res.json(messages);
    } catch (error) {
      next(error);
    }
  }

  static async createChatRoom(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
      }

      const chatInfo = req.body;
      const chatsService = new ChatsService();

      const messages = await chatsService.createChatRoom(chatInfo);
      return res.json(messages);
    } catch (error) {
      next(error);
    }
  }

  static async sendMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
      }

      const { id } = req.params;
      const messageInfo = req.body;
      const chatsService = new ChatsService();

      const messages = await chatsService.sendMessage(id, messageInfo);
      return res.json(messages);
    } catch (error) {
      next(error);
    }
  }
}
