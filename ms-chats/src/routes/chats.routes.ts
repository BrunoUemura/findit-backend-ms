import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { ChatsController } from "../controllers/ChatsController";

export const chats = Router();

chats
  .get("/chats", authMiddleware, ChatsController.showAllChatRooms)
  .get("/chatsById/:id", authMiddleware, ChatsController.showAllChatRoomsById)
  .get(
    "/chatsByUser/:id",
    authMiddleware,
    ChatsController.showAllChatRoomsByUser
  )
  .get("/chat/messages/:id", authMiddleware, ChatsController.showAllMessages)
  .post("/chat/create-chat", authMiddleware, ChatsController.createChatRoom)
  .post("/chat/send-message/:id", authMiddleware, ChatsController.sendMessage);
