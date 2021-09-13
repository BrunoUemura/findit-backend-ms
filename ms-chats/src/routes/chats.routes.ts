import { Router } from "express";
import { body } from "express-validator";
import { authMiddleware } from "../middlewares/authMiddleware";
import { ChatsController } from "../controllers/ChatsController";

export const chats = Router();

const chatValidation = [
  body("sender_id").notEmpty(),
  body("receiver_id").notEmpty(),
];

const messageValidation = [
  body("sender_id").notEmpty(),
  body("content").notEmpty(),
];

chats
  .get("/chats", authMiddleware, ChatsController.showAllChatRooms)
  .get(
    "/chats/chatsbyId/:id",
    authMiddleware,
    ChatsController.showAllChatRoomsById
  )
  .get(
    "/chats/chatsByUser/:id",
    authMiddleware,
    ChatsController.showAllChatRoomsByUser
  )
  .get("/chats/messages/:id", authMiddleware, ChatsController.showAllMessages)
  .post(
    "/chats/create-chat",
    authMiddleware,
    chatValidation,
    ChatsController.createChatRoom
  )
  .post(
    "/chats/send-message/:id",
    authMiddleware,
    messageValidation,
    ChatsController.sendMessage
  );
