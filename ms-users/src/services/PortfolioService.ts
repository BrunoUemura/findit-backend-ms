import mongoose from "mongoose";
import { Portfolios } from "../schemas/Portfolio";

export class PortfolioService {
  constructor() {
    mongoose.connect(process.env.MONGO_URL, {
      authSource: "admin",
      auth: {
        username: process.env.MONGO_USER,
        password: process.env.MONGO_PASS,
      },
    });
  }

  async showAllUsersPortfolios() {
    return await Portfolios.find();
  }

  async showUserPortfolios(id: string) {
    return await Portfolios.find({ userId: id });
  }

  async getPortfolioImages(id: string) {
    const portfolio = await Portfolios.find({ userId: id });
    const result = [];

    portfolio.map((p: any) => {
      result.push(p.userPortfolios);
    });

    return result;
  }

  async getPortfolioImage(id: string, image_id: string) {
    const portfolio: any = await Portfolios.find(
      { userId: id },
      { userPortfolios: { $elemMatch: { _id: image_id } } }
    );

    return portfolio[0].userPortfolios[0].photoUrl;
  }

  async uploadPortfolioImages(userId: string, files) {
    const query = { userId };

    const portfolioExists = await Portfolios.find(query);

    if (portfolioExists.length === 0) {
      await Portfolios.create({ userId, userPhoto: [] });
    }

    files.forEach(async ({ filename }) => {
      const updateDocument = {
        $push: { userPortfolios: { photoUrl: filename, photoDescription: "" } },
      };

      await Portfolios.updateOne(query, updateDocument);
    });

    return { message: `UPDATED user id ${userId} portfolio added` };
  }
}
