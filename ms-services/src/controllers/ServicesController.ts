import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ServicesService } from "../services/ServicesService";
import { StatusCodes } from "http-status-codes";
import { RequestValidationError } from "../errors/RequestValidationError";

export class ServicesController {
  static async showAllServices(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const servicesService = new ServicesService();
      const { title, category, city, state, country } = req.query;
      const where: any = {};

      if (title) {
        where.title = title;
      }
      if (category) {
        where.category = category;
      }
      if (city) {
        where.city = city;
      }
      if (state) {
        where.state = state;
      }
      if (country) {
        where.country = country;
      }

      const services = await servicesService.showAllServices(where);
      return res.json(services);
    } catch (error) {
      next(error);
    }
  }

  static async showOneService(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const servicesService = new ServicesService();

      const service = await servicesService.showOneService(id);
      return res.json(service);
    } catch (error) {
      next(error);
    }
  }

  static async showServicesQuantity(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const servicesService = new ServicesService();

      const servicesQuantity = await servicesService.showServicesQuantity();
      return res.json(servicesQuantity);
    } catch (error) {
      next(error);
    }
  }

  static async showUserCompletedServicesCount(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const servicesService = new ServicesService();

      const service = await servicesService.showUserCompletedServicesCount(id);
      return res.json(service);
    } catch (error) {
      next(error);
    }
  }

  static async createService(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
      }

      const serviceInfo = req.body;
      const servicesService = new ServicesService();

      const service = await servicesService.createService(serviceInfo);
      return res.json(service);
    } catch (error) {
      next(error);
    }
  }

  static async completeService(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
      }

      const servicesService = new ServicesService();
      const serviceCompleted = req.body;

      const service = await servicesService.completeService(serviceCompleted);
      return res.json(service);
    } catch (error) {
      next(error);
    }
  }

  static async updateService(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const serviceInfo = req.body;
      const servicesService = new ServicesService();

      const service = await servicesService.updateService(id, serviceInfo);
      return res.json(service);
    } catch (error) {
      next(error);
    }
  }

  static async deleteService(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const servicesService = new ServicesService();

      const service = await servicesService.deleteService(id);
      return res.json(service);
    } catch (error) {
      next(error);
    }
  }

  static async showServicesFromUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const servicesService = new ServicesService();

      const userAllServices = await servicesService.showServicesFromUser(id);
      return res.json(userAllServices);
    } catch (error) {
      next(error);
    }
  }
}
