import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { ServicesController } from "../controllers/ServicesController";

export const services = Router();

services
  .get("/services", ServicesController.showAllServices)
  .get("/services/:id", ServicesController.showOneService)
  .get("/services/all/count", ServicesController.showServicesQuantity)
  .get("/services/user/:id", ServicesController.showServicesFromUser)
  // .get(
  //   "/services/all/categories",
  //   ServicesController.showServicesCategories
  // )
  .post("/services", authMiddleware, ServicesController.createService)
  .post(
    "/services/complete",
    authMiddleware,
    ServicesController.completeService
  )
  .put("/services/:id", authMiddleware, ServicesController.updateService)
  .delete("/services/:id", authMiddleware, ServicesController.deleteService);
