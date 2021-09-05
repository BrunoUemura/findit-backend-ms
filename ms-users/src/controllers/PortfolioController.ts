import { Request, Response } from "express";
import { PortfolioService } from "../services/PortfolioService";
import { StatusCodes } from "http-status-codes";
import path from "path";

export class PortfolioController {
  static async showAllUsersPortfolios(_: Request, res: Response) {
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

  static async showUserPortfolios(req: Request, res: Response) {
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

  static async getPortfolioImages(req: Request, res: Response) {
    const portfolioService = new PortfolioService();
    const { id } = req.params;

    try {
      const portfolio: any = await portfolioService.getPortfolioImages(id);

      if (!portfolio) {
        return res.json({ message: "User has no portfolio" });
      }

      return res.sendFile(`../`);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  static async getPortfolioImage(req: Request, res: Response) {
    const portfolioService = new PortfolioService();
    const { id, image_id } = req.params;

    try {
      const portfolio = await portfolioService.getPortfolioImage(id, image_id);

      if (!portfolio) {
        return res.json({ message: "User has no portfolio" });
      }

      return res.sendFile(path.resolve(__dirname, "..", "uploads", portfolio));
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  static async uploadPortfolioImages(req: Request, res: Response) {
    const portfolioService = new PortfolioService();
    const { id } = req.params;
    const { files } = req;

    try {
      const upload = await portfolioService.uploadPortfolioImages(id, files);
      return res.json(upload);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }
}
