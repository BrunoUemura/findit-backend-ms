const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema(
  {
    user_id: String,
    userPortfolios: [
      {
        photo_url: String,
      },
    ],
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  {
    versionKey: false,
  }
);

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

module.exports = Portfolio;
