import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { RequestValidationError } from "../errors/RequestValidationError";
import { validationResult } from "express-validator";

export class AuthController {
  static async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
      }

      const { name, email, password } = req.body;
      const authService = new AuthService();

      const users = await authService.registerUser({ name, email, password });
      return res.json(users);
    } catch (error) {
      next(error);
    }
  }

  static async confirmRegistration(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    const authService = new AuthService();

    try {
      const users = await authService.confirmRegistration(id);
      return res.json(users);
    } catch (error) {
      next(error);
    }
  }

  static async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
      }

      const { email, password } = req.body;
      const authService = new AuthService();

      const users = await authService.loginUser({ email, password });
      return res.json(users);
    } catch (error) {
      next(error);
    }
  }

  static async logoutUser(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
      }

      const { token } = req.body;
      const authService = new AuthService();

      const { auth, message } = await authService.logoutUser(token);
      return res.json({ auth, message });
    } catch (error) {
      next(error);
    }
  }
}
