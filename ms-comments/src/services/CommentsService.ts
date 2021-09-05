import { getCustomRepository, Repository } from "typeorm";
import { NotFound } from "../errors/NotFound";
import { Comment } from "../models/Comment";
import { Service } from "../models/Service";
import { CommentsRepository } from "../repositories/CommentsRepository";
import { ServicesRepository } from "../repositories/ServicesRepository";

interface INewComment {
  sender_id: string;
  comment: string;
}

export class CommentsService {
  private commentsRepository: Repository<Comment>;
  private servicesRepository: Repository<Service>;

  constructor() {
    this.commentsRepository = getCustomRepository(CommentsRepository);
    this.servicesRepository = getCustomRepository(ServicesRepository);
  }

  async showAllComments(id: string) {
    return await this.commentsRepository.find({
      where: { service_id: id },
      relations: ["user"],
    });
  }

  async createComment(id: string, commentInfo: INewComment) {
    // Check if Service exists
    const serviceExists = await this.servicesRepository.findOne({
      where: { id },
    });

    if (!serviceExists) {
      throw new NotFound("Service associated");
    }

    // Post Comment
    const response = this.commentsRepository.create({
      service_id: id,
      sender_id: commentInfo.sender_id,
      comment: commentInfo.comment,
    });
    await this.commentsRepository.save(response);

    return { message: `Comment ${response.id} posted successfully!` };
  }
}
