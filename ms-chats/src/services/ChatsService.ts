import { getCustomRepository, Repository } from "typeorm";
import { NotFound } from "../errors/NotFound";
import { Chat } from "../models/Chat";
import { Message } from "../models/Message";
import { User } from "../models/User";
import { ChatsRepository } from "../repositories/ChatsRepository";
import { MessagesRepository } from "../repositories/MessagesRepository";
import { UsersRepository } from "../repositories/UsersRepository";

interface IMessageSend {
  sender_id: string;
  content: string;
}

export class ChatsService {
  private chatsRepository: Repository<Chat>;
  private messagesRepository: Repository<Message>;
  private usersRepository: Repository<User>;

  constructor() {
    this.chatsRepository = getCustomRepository(ChatsRepository);
    this.messagesRepository = getCustomRepository(MessagesRepository);
    this.usersRepository = getCustomRepository(UsersRepository);
  }

  async showAllChatRooms() {
    return await this.chatsRepository.find();
  }

  async showAllChatRoomsById(id: string) {
    return await this.chatsRepository.findOne(id);
  }

  async showAllChatRoomsByUser(id: string) {
    const allChats: any = await this.chatsRepository.find({
      where: [
        {
          sender_id: id,
        },
        {
          receiver_id: id,
        },
      ],
    });

    for (let chat in allChats) {
      const fetchID =
        allChats[chat].sender_id === id
          ? allChats[chat].receiver_id
          : allChats[chat].sender_id;

      const userInformation = await this.usersRepository.findOne({
        where: {
          id: fetchID,
        },
      });

      allChats[chat].userInfo = userInformation;
    }

    return allChats;
  }

  async showAllMessages(id: string) {
    return await this.messagesRepository.find({ where: { chat_id: id } });
  }

  async createChatRoom(chatInfo: any) {
    // Check if Users associated exists
    const senderExists = await this.usersRepository.findOne({
      where: { id: chatInfo.sender_id },
    });
    const receiverExists = await this.usersRepository.findOne({
      where: { id: chatInfo.receiver_id },
    });
    if (!senderExists || !receiverExists) {
      throw new NotFound("Users associated");
    }

    // Check if the Chat Room already exists
    const chatExists = await this.chatsRepository.findOne({
      where: [
        {
          sender_id: chatInfo.sender_id,
          receiver_id: chatInfo.receiver_id,
        },
        {
          sender_id: chatInfo.receiver_id,
          receiver_id: chatInfo.sender_id,
        },
      ],
    });

    if (chatExists) {
      return { chat_id: chatExists.id, message: `Chat Room already exists!` };
    }

    // Create Chat Room
    const data: any = this.chatsRepository.create(chatInfo);
    await this.chatsRepository.save(data);
    return { message: `Chat Room ${data.id} created successfully!` };
  }

  async sendMessage(id: string, messageInfo: IMessageSend) {
    // Check if Chat Room exists
    const chatExists = await this.chatsRepository.findOne({ where: { id } });
    if (!chatExists) {
      throw new NotFound("Chat associated");
    }

    // Check if sender_id is associated to chat room
    const userAssociated = await this.chatsRepository.findOne({
      where: [
        { sender_id: messageInfo.sender_id },
        { receiver_id: messageInfo.sender_id },
      ],
    });

    if (!userAssociated) {
      throw new NotFound("User associated");
    }

    // Send message
    const messages = this.messagesRepository.create({
      chat_id: id,
      sender_id: messageInfo.sender_id,
      content: messageInfo.content,
    });

    await this.messagesRepository.save(messages);

    return { message: `Message ${messages.id} sent successfully!` };
  }
}
