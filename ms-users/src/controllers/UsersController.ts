import { NextFunction, Request, Response } from "express";
import { UsersService } from "../services/UsersService";
import path from "path";

export class UsersController {
  static async showAllUsers(req: Request, res: Response, next: NextFunction) {
    const usersService = new UsersService();

    try {
      const users = await usersService.showAllUsers();
      return res.json(users);
    } catch (error) {
      next(error);
    }
  }

  static async showOneUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const usersService = new UsersService();

    try {
      const user = await usersService.showOneUser(id);
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  static async showUsersCount(req: Request, res: Response, next: NextFunction) {
    const usersService = new UsersService();

    try {
      const usersCount = await usersService.showUsersCount();
      return res.json(usersCount);
    } catch (error) {
      next(error);
    }
  }

  // static async showUserCompletedServicesCount(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) {
  //   const usersService = new UsersService();
  //   const { id } = req.params;

  //   try {
  //     const userCompletedServicesCount =
  //       await usersService.showUserCompletedServicesCount(id);
  //     return res.json(userCompletedServicesCount);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  static async getProfileImage(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    const usersService = new UsersService();

    try {
      const profileImage = await usersService.getProfileImage(id);

      if (!profileImage) {
        return res.json({ message: "User has no photo", hasPhoto: false });
      }

      return res.sendFile(
        path.resolve(__dirname, "..", "uploads", profileImage)
      );
    } catch (error) {
      next(error);
    }
  }

  static async updateUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const userInfo = req.body;
    const usersService = new UsersService();

    try {
      const user = await usersService.updateUser(id, userInfo);
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  static async uploadProfileImage(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    const { filename } = req.file;
    const usersService = new UsersService();

    try {
      const upload = await usersService.uploadProfileImage(id, filename);
      return res.json(upload);
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const usersService = new UsersService();

    try {
      const user = await usersService.deleteUser(id);
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }
}
