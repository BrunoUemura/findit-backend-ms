const { Router } = require("express");
const ServicesController = require("../controllers/ServicesController");
const authMiddleware = require("../middlewares/authMiddleware");

const Services = Router();

// ROUTES
Services.get("/services", ServicesController.showAllServices);
Services.get("/services/:id", ServicesController.showOneService);
Services.get("/services/all/count", ServicesController.showServicesQuantity);
Services.get("/services/user/:id", ServicesController.showServicesFromUser);
Services.get(
  "/services/all/categories",
  ServicesController.showServicesCategories
);
Services.post("/services/", authMiddleware, ServicesController.createService);
Services.put("/services/:id", authMiddleware, ServicesController.updateService);
Services.delete(
  "/services/:id",
  authMiddleware,
  ServicesController.deleteService
);

module.exports = Services;
