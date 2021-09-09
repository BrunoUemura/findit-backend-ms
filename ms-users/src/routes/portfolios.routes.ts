import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { PortfolioController } from "../controllers/PortfolioController";
import multer from "multer";
import { multerConfig } from "../config/multer";

export const portfolios = Router();

portfolios
  .get("/users/all/portfolios", PortfolioController.showAllUsersPortfolios)
  .get("/users/:id/portfolios", PortfolioController.showUserPortfolios)
  .get(
    "/users/:id/portfolios-image/:image_id",
    PortfolioController.getPortfolioImage
  )
  .post(
    "/users/:id/portfolios/upload",
    authMiddleware,
    multer(multerConfig).single("file"),
    PortfolioController.uploadPortfolioImages
  )
  .put(
    "/users/:id/portfolios/:image_id",
    authMiddleware,
    multer(multerConfig).single("file"),
    PortfolioController.updatePortfolioImages
  )
  .delete(
    "/users/:id/portfolios/:image_id",
    authMiddleware,
    PortfolioController.deletePortfolioImage
  );
