import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { StatusCodes } from "http-status-codes";
import { MissingData } from "../errors/MissingData";

export class AuthController {
  static checkRegistrationFields(
    name: string,
    email: string,
    password: string
  ) {
    if (!name) {
      throw new MissingData("name");
    }
    if (!email) {
      throw new MissingData("email");
    }
    if (!password) {
      throw new MissingData("password");
    }
  }

  static checkLoginFields(email: string, password: string) {
    if (!email) {
      throw new MissingData("email");
    }
    if (!password) {
      throw new MissingData("password");
    }
  }

  static async registerUser(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const authService = new AuthService();

    try {
      AuthController.checkRegistrationFields(name, email, password);
      const users = await authService.registerUser({ name, email, password });
      return res.json(users);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  static async confirmRegistration(req: Request, res: Response) {
    const { id } = req.params;
    const authService = new AuthService();

    try {
      const users = await authService.confirmRegistration(id);
      return res.json(users);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  static async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;
    const authService = new AuthService();

    try {
      AuthController.checkLoginFields(email, password);
      const users = await authService.loginUser({ email, password });
      return res.json(users);
    } catch (error) {
      console.log(error);
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  static async logoutUser(req: Request, res: Response) {
    const { token } = req.body;
    const authService = new AuthService();

    try {
      const { auth, message } = await authService.logoutUser(token);
      return res.json({ auth, message });
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }
}
