import { NextFunction, Request, Response } from "express";
import { PortfolioService } from "../services/PortfolioService";
import { StatusCodes } from "http-status-codes";
import path from "path";

export class PortfolioController {
  static async showAllUsersPortfolios(
    _: Request,
    res: Response,
    next: NextFunction
  ) {
    const portfolioService = new PortfolioService();

    try {
      const usersPortfolios = await portfolioService.showAllUsersPortfolios();
      return res.json(usersPortfolios);
    } catch (error) {
      next(error);
    }
  }

  static async showUserPortfolios(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const portfolioService = new PortfolioService();
    const { id } = req.params;

    try {
      const userPortfolios = await portfolioService.showUserPortfolios(id);
      return res.json(userPortfolios);
    } catch (error) {
      next(error);
    }
  }

  static async getPortfolioImage(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const portfolioService = new PortfolioService();
    const { id, image_id } = req.params;

    try {
      const portfolio = await portfolioService.getPortfolioImage(id, image_id);

      if (!portfolio) {
        return res.json({ message: "User has no portfolio" });
      }

      return res.sendFile(path.resolve(__dirname, "..", "uploads", portfolio));
    } catch (error) {
      next(error);
    }
  }

  static async uploadPortfolioImages(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const portfolioService = new PortfolioService();
    const { id } = req.params;
    const { file } = req;
    const { description = "" } = req.body;

    try {
      const upload = await portfolioService.uploadPortfolioImages(
        id,
        file,
        description
      );
      return res.json(upload);
    } catch (error) {
      next(error);
    }
  }

  static async updatePortfolioImages(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const portfolioService = new PortfolioService();
    const { id, image_id } = req.params;
    const { file } = req;
    const { description } = req.body;

    try {
      const upload = await portfolioService.updatePortfolioImages(
        id,
        image_id,
        file,
        description
      );
      return res.json(upload);
    } catch (error) {
      next(error);
    }
  }

  static async deletePortfolioImage(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const portfolioService = new PortfolioService();
    const { id, image_id } = req.params;

    try {
      const portfolio = await portfolioService.deletePortfolioImage(
        id,
        image_id
      );

      return res.send(portfolio);
    } catch (error) {
      next(error);
    }
  }
}
