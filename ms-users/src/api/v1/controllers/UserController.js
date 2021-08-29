const UsersService = require("../services/UsersService");
const { StatusCodes } = require("http-status-codes");
const path = require("path");

class UsersController {
  static async showAllUsers(_, res) {
    const usersService = new UsersService();

    try {
      const users = await usersService.showAllUsers();
      return res.json(users);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  static async showOneUser(req, res) {
    const { id } = req.params;
    const usersService = new UsersService();

    try {
      const user = await usersService.showOneUser(id);
      return res.json(user);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  static async showUsersQuantity(req, res) {
    const usersService = new UsersService();
    try {
      const usersQuantity = await usersService.showUsersQuantity();
      return res.json(usersQuantity);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  static async getProfileImage(req, res) {
    const { id } = req.params;
    const usersService = new UsersService();

    try {
      const profileImage = await usersService.getProfileImage(id);

      if (!profileImage) {
        return res.json({ message: "User has no photo" });
      }

      return res.sendFile(
        path.resolve(__dirname, "..", "..", "uploads", profileImage)
      );
    } catch (error) {
      return res.status(error.status).json({ message: error.message });
    }
  }

  static async updateUser(req, res) {
    const { id } = req.params;
    const userInfo = req.body;
    const usersService = new UsersService();

    try {
      const user = await usersService.updateUser(userInfo, id);
      return res.json(user);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  static async uploadProfileImage(req, res) {
    const { id } = req.params;
    const { filename } = req.file;
    const usersService = new UsersService();

    try {
      const upload = await usersService.uploadProfileImage(filename, id);
      return res.json(upload);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  static async deleteUser(req, res) {
    const { id } = req.params;
    const usersService = new UsersService();

    try {
      const user = await usersService.deleteUser(id);
      return res.json(user);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }
}

module.exports = UsersController;
