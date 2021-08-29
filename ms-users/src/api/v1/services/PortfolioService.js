const mongoose = require("mongoose");
const Portfolios = require("../database/schemas/Portfolios");

class PortfolioService {
  constructor() {
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  async showAllUsersPortfolios() {
    return await Portfolios.find();
  }

  async showUserPortfolios(id) {
    return await Portfolios.find({ user_id: id });
  }

  async getPortfolioImages(id) {
    const portfolio = await Portfolios.find({ user_id: id });
    const result = [];

    portfolio.map((p) => {
      result.push(p.userPortfolios);
    });

    return result;
  }

  async getPortfolioImage(id, image_id) {
    const portfolio = await Portfolios.find(
      { user_id: id },
      { userPortfolios: { $elemMatch: { _id: image_id } } }
    );

    return portfolio[0].userPortfolios[0].photo_url;
  }

  async uploadPortfolioImages(files, user_id) {
    const query = { user_id };

    const portfolioExists = await Portfolios.find(query);

    if (portfolioExists.length === 0) {
      await Portfolios.create({ user_id, userPhoto: [] });
    }

    files.forEach(async ({ filename }) => {
      const updateDocument = {
        $push: { userPortfolios: { photo_url: filename } },
      };
      await Portfolios.updateOne(query, updateDocument);
    });

    return { message: `UPDATED user id ${user_id} portfolio added` };
  }
}

module.exports = PortfolioService;
