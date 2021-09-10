import { Router } from "express";
import { CategoriesController } from "../controllers/CategoriesController";

export const categories = Router();

categories.get("/categories", CategoriesController.showAllCategories);
