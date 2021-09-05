import { EntityRepository, Repository } from "typeorm";
import { Chat } from "../models/Chat";

@EntityRepository(Chat)
export class ChatsRepository extends Repository<Chat> {}
