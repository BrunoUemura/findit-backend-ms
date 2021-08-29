const PortfolioService = require("../services/PortfolioService");
const { StatusCodes } = require("http-status-codes");
const path = require("path");

class PortfolioController {
  static async showAllUsersPortfolios(_, res) {
    const portfolioService = new PortfolioService();

    try {
      const usersPortfolios = await portfolioService.showAllUsersPortfolios();
      return res.json(usersPortfolios);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  static async showUserPortfolios(req, res) {
    const portfolioService = new PortfolioService();
    const { id } = req.params;

    try {
      const userPortfolios = await portfolioService.showUserPortfolios(id);
      return res.json(userPortfolios);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  static async getPortfolioImages(req, res) {
    const portfolioService = new PortfolioService();
    const { id } = req.params;

    try {
      const portfolio = await portfolioService.getPortfolioImages(id);

      if (!portfolio) {
        return res.json({ message: "User has no portfolio" });
      }

      return res.sendFile(
        path.resolve(__dirname, "..", "..", "uploads", portfolio)
      );
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  static async getPortfolioImage(req, res) {
    const portfolioService = new PortfolioService();
    const { id, image_id } = req.params;

    try {
      const portfolio = await portfolioService.getPortfolioImage(id, image_id);

      if (!portfolio) {
        return res.json({ message: "User has no portfolio" });
      }

      return res.sendFile(
        path.resolve(__dirname, "..", "..", "uploads", portfolio)
      );
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  static async uploadPortfolioImages(req, res) {
    const portfolioService = new PortfolioService();
    const { id } = req.params;
    const { files } = req;

    try {
      const upload = await portfolioService.uploadPortfolioImages(files, id);
      return res.json(upload);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }
}

module.exports = PortfolioController;
