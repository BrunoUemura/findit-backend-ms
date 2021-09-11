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
  .get("/chatsById/:id", authMiddleware, ChatsController.showAllChatRoomsById)
  .get(
    "/chatsByUser/:id",
    authMiddleware,
    ChatsController.showAllChatRoomsByUser
  )
  .get("/chat/messages/:id", authMiddleware, ChatsController.showAllMessages)
  .post(
    "/chat/create-chat",
    authMiddleware,
    chatValidation,
    ChatsController.createChatRoom
  )
  .post(
    "/chat/send-message/:id",
    authMiddleware,
    messageValidation,
    ChatsController.sendMessage
  );
