const { Router } = require("express");
const UsersController = require("../controllers/UserController");
const PortfolioController = require("../controllers/PortfolioController");
const authMiddleware = require("../middlewares/authMiddleware");
const multer = require("multer");
const multerConfig = require("../../../config/multer");

const users = Router();

// ROUTES
users.get("/users", UsersController.showAllUsers);
users.get("/users/all/count", UsersController.showUsersQuantity);
users.get("/users/:id", UsersController.showOneUser);
users.get("/users/:id/profile-image", UsersController.getProfileImage);
users.post(
  "/users/:id/profile-image/upload",
  authMiddleware,
  multer(multerConfig).single("file"),
  UsersController.uploadProfileImage
);
users.put("/users/:id", authMiddleware, UsersController.updateUser);
users.delete("/users/:id", authMiddleware, UsersController.deleteUser);

// Portfolios
users.get("/users/all/portfolios", PortfolioController.showAllUsersPortfolios);
users.get("/users/:id/portfolios", PortfolioController.showUserPortfolios);
users.get(
  "/users/:id/portfolios-image",
  PortfolioController.getPortfolioImages
);
users.get(
  "/users/:id/portfolios-image/:image_id",
  PortfolioController.getPortfolioImage
);
users.post(
  "/users/:id/portfolios/upload",
  authMiddleware,
  multer(multerConfig).array("file"),
  PortfolioController.uploadPortfolioImages
);

module.exports = users;
