import { getCustomRepository, Repository } from "typeorm";
import { Portfolio } from "../models/Portfolio";
import { User } from "../models/User";
import { PortfoliosRepository } from "../repositories/PortfoliosRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import { NotFoundError } from "../errors/NotFoundError";
import { BadRequestError } from "../errors/BadRequestError";

export class PortfolioService {
  private portfoliosRepository: Repository<Portfolio>;
  private usersRepository: Repository<User>;

  constructor() {
    this.portfoliosRepository = getCustomRepository(PortfoliosRepository);
    this.usersRepository = getCustomRepository(UsersRepository);
  }

  async showAllUsersPortfolios() {
    return await this.portfoliosRepository.find();
  }

  async showUserPortfolios(id: string) {
    const userExists = await this.usersRepository.findOne(id);
    if (!userExists) {
      throw new NotFoundError("User not found");
    }

    return await this.portfoliosRepository.find({
      where: {
        user_id: id,
      },
    });
  }

  async getPortfolioImage(id: string, image_id: string) {
    const userExists = await this.usersRepository.findOne(id);
    if (!userExists) {
    }

    const portfolio = await this.portfoliosRepository.findOne({
      where: {
        id: image_id,
        user_id: id,
      },
    });

    if (!portfolio) {
      throw new NotFoundError("Portfolio not found");
    }

    return portfolio.photoUrl;
  }

  async uploadPortfolioImages(userId: string, file: any, description: string) {
    const userExists = await this.usersRepository.findOne(userId);
    if (!userExists) {
      throw new NotFoundError("User not found");
    }

    const portfolio = this.portfoliosRepository.create({
      user_id: userId,
      photoUrl: file.filename,
      photoDescription: description,
    });
    await this.portfoliosRepository.save(portfolio);

    return { message: `UPDATED user id ${userId} portfolio added` };
  }

  async updatePortfolioImages(
    userId: string,
    imageId: string,
    file: any,
    description: string
  ) {
    const portfolioExists = await this.portfoliosRepository.findOne(imageId);
    if (!portfolioExists) {
      throw new NotFoundError("Portfolio not found");
    }

    if (!file && !description) {
      throw new BadRequestError("No file and description provided");
    }

    if (!file) {
      await this.portfoliosRepository.update(imageId, {
        photoDescription: description,
      });
    }

    if (!description) {
      await this.portfoliosRepository.update(imageId, {
        photoUrl: file.filename,
      });
    }

    if (file && description) {
      await this.portfoliosRepository.update(imageId, {
        photoUrl: file.filename,
        photoDescription: description,
      });
    }

    return { message: `UPDATED user id ${userId} portfolio updated` };
  }

  async deletePortfolioImage(userId: string, imageId: string) {
    const userExists = await this.usersRepository.findOne(userId);
    if (!userExists) {
      throw new NotFoundError("User not found");
    }

    const portfolioToRemove = await this.portfoliosRepository.findOne(imageId);
    if (!portfolioToRemove) {
      throw new NotFoundError("Portfolio not found");
    }

    await this.portfoliosRepository.softRemove(portfolioToRemove);
    return { message: `DELETED portfolio id ${imageId}` };
  }
}
