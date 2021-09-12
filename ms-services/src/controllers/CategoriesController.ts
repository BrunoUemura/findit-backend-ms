import { NextFunction, Request, Response } from "express";
import { CategoriesService } from "../services/CategoriesService";

export class CategoriesController {
  static async showAllCategories(
    _: Request,
    res: Response,
    next: NextFunction
  ) {
    const categoriesService = new CategoriesService();

    try {
      const categories = await categoriesService.showAllCategories();
      return res.json(categories);
    } catch (error) {
      next(error);
    }
  }
}
