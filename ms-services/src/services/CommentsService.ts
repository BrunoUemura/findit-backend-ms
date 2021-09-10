import { getRepository, Repository } from "typeorm";
import { NotFoundError } from "../errors/NotFoundError";
import { Comment } from "../models/Comment";
import { Service } from "../models/Service";
import { User } from "../models/User";

interface INewComment {
  sender_id: string;
  comment: string;
}

export class CommentsService {
  private commentsRepository: Repository<Comment>;
  private servicesRepository: Repository<Service>;
  private usersRepository: Repository<User>;

  constructor() {
    this.commentsRepository = getRepository(Comment);
    this.servicesRepository = getRepository(Service);
    this.usersRepository = getRepository(User);
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
      throw new NotFoundError("Service associated not found");
    }

    // Check if user exists
    const userExists = await this.usersRepository.findOne({
      where: { id: commentInfo.sender_id },
    });

    if (!userExists) {
      throw new NotFoundError("User associated not found");
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

  async deleteComment(id: string) {
    const commentToDelete = await this.commentsRepository.findOne(id);
    if (!commentToDelete) {
      throw new NotFoundError("Comment not found");
    }

    await this.commentsRepository.softRemove(commentToDelete);
    return { message: `Comment ${id} deleted successfully` };
  }
}
