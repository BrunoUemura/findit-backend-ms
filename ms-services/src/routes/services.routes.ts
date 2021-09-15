import { Router } from "express";
import { body } from "express-validator";
import { authMiddleware } from "../middlewares/authMiddleware";
import { ServicesController } from "../controllers/ServicesController";

export const services = Router();

const serviceValidation = [
  body("user_id").notEmpty(),
  body("title").notEmpty(),
  body("category").notEmpty(),
  body("description").notEmpty(),
  body("price").notEmpty(),
  body("city").notEmpty(),
  body("state").notEmpty(),
  body("country").notEmpty(),
];

const serviceCompleteValidation = [
  body("user_id").notEmpty(),
  body("service_id").notEmpty(),
];

services
  .get("/services", ServicesController.showAllServices)
  .get("/services/:id", ServicesController.showOneService)
  .get("/services/all/count", ServicesController.showServicesQuantity)
  .get("/services/user/:id", ServicesController.showServicesFromUser)
  .post(
    "/services",
    authMiddleware,
    serviceValidation,
    ServicesController.createService
  )
  .get(
    "/services/user/:id/completed-services/count",
    ServicesController.showUserCompletedServicesCount
  )
  .post(
    "/services/complete",
    authMiddleware,
    serviceCompleteValidation,
    ServicesController.completeService
  )
  .put("/services/:id", authMiddleware, ServicesController.updateService)
  .delete("/services/:id", authMiddleware, ServicesController.deleteService);
