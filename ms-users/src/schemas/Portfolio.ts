import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema(
  {
    userId: String,
    userPortfolios: [
      {
        photoUrl: String,
        photoDescription: String,
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

export const Portfolios = mongoose.model("Portfolio", portfolioSchema);
