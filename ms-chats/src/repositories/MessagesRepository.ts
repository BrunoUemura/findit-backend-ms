import { EntityRepository, Repository } from "typeorm";
import { Message } from "../models/Message";

@EntityRepository(Message)
export class MessagesRepository extends Repository<Message> {}
