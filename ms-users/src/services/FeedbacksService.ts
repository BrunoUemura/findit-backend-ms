import { getCustomRepository, Repository } from "typeorm";
import { UserFeedback } from "../models/UserFeedback";
import { User } from "../models/User";
import { UsersFeedbacksRepository } from "../repositories/UsersFeedbacksRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import { NotFoundError } from "../errors/NotFoundError";

interface ICreateFeedback {
  user_id: string;
  reviewer_id: string;
  score: string;
}

export class FeedbacksService {
  private usersFeedbacksRepository: Repository<UserFeedback>;
  private usersRepository: Repository<User>;

  constructor() {
    this.usersFeedbacksRepository = getCustomRepository(
      UsersFeedbacksRepository
    );
    this.usersRepository = getCustomRepository(UsersRepository);
  }

  async showAllUsersFeedbacks() {
    return await this.usersFeedbacksRepository.find();
  }

  async showUserFeedbacks(id: string) {
    const userExists = await this.usersRepository.findOne(id);
    if (!userExists) {
      throw new NotFoundError("User not found");
    }

    return await this.usersFeedbacksRepository.find({
      where: {
        user_id: id,
      },
    });
  }

  async showUserFeedback(id: string, feedback_id: string) {
    const userExists = await this.usersRepository.findOne(id);
    if (!userExists) {
      throw new NotFoundError("User not found");
    }

    const feedback = await this.usersFeedbacksRepository.findOne({
      where: {
        id: feedback_id,
        user_id: id,
      },
    });

    if (!feedback) {
      throw new NotFoundError("Feedback not found");
    }

    return feedback;
  }

  async showUserAverageFeedbacks(id: string) {
    const userExists = await this.usersRepository.findOne(id);
    if (!userExists) {
      throw new NotFoundError("User not found");
    }

    const avgFeedback = await this.usersFeedbacksRepository.findOne({
      where: {
        user_id: id,
      },
    });

    if (!avgFeedback) {
      throw new NotFoundError("Feedback not found");
    }

    return avgFeedback;
  }

  async createUserFeedback(userId: string, feedbackInfo: ICreateFeedback) {
    const userExists = await this.usersRepository.findOne(userId);
    if (!userExists) {
      throw new NotFoundError("User not found");
    }

    const feedback = this.usersFeedbacksRepository.create({
      user_id: userId,
      reviewer_id: feedbackInfo.reviewer_id,
      score: Number(feedbackInfo.score),
    });
    await this.usersFeedbacksRepository.save(feedback);

    return { message: `CREATE user id ${userId} feedback` };
  }

  async updateUserFeedback(
    userId: string,
    feedback_id: string,
    feedbackInfo: ICreateFeedback
  ) {
    // Check if user exists
    const userExists = await this.usersRepository.findOne(userId);
    if (!userExists) {
      throw new NotFoundError("User not found");
    }

    // Check if feedback exists
    const feedbackExists = await this.usersFeedbacksRepository.findOne(
      feedback_id
    );
    if (!feedbackExists) {
      throw new NotFoundError("Feedback not found");
    }

    await this.usersFeedbacksRepository.update(feedback_id, {
      reviewer_id: feedbackInfo.reviewer_id,
      score: Number(feedbackInfo.score),
    });

    return { message: `UPDATED user id ${userId} feedback` };
  }
}
