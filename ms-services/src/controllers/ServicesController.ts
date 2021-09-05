import { Request, Response } from "express";
import { ServicesService } from "../services/ServicesService";
import { StatusCodes } from "http-status-codes";

export class ServicesController {
  static async showAllServices(req: Request, res: Response) {
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

    try {
      const services = await servicesService.showAllServices(where);
      return res.json(services);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  static async showOneService(req: Request, res: Response) {
    const { id } = req.params;
    const servicesService = new ServicesService();

    try {
      const service = await servicesService.showOneService(id);
      return res.json(service);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  static async showServicesQuantity(req: Request, res: Response) {
    const servicesService = new ServicesService();

    try {
      const servicesQuantity = await servicesService.showServicesQuantity();
      return res.json(servicesQuantity);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  // static async showServicesCategories(_: Request, res: Response) {
  //   const servicesService = new ServicesService();

  //   try {
  //     const categories = await servicesService.showServicesCategories();
  //     return res.json(categories);
  //   } catch (error) {
  //     return res
  //       .status(StatusCodes.BAD_REQUEST)
  //       .json({ message: error.message });
  //   }
  // }

  static async createService(req: Request, res: Response) {
    const serviceInfo = req.body;
    const servicesService = new ServicesService();

    try {
      const service = await servicesService.createService(serviceInfo);
      return res.json(service);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  static async completeService(req: Request, res: Response) {
    const servicesService = new ServicesService();
    const serviceCompleted = req.body;

    try {
      const service = await servicesService.completeService(serviceCompleted);
      return res.json(service);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  static async updateService(req: Request, res: Response) {
    const { id } = req.params;
    const serviceInfo = req.body;
    const servicesService = new ServicesService();

    try {
      const service = await servicesService.updateService(id, serviceInfo);
      return res.json(service);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  static async deleteService(req: Request, res: Response) {
    const { id } = req.params;
    const servicesService = new ServicesService();

    try {
      const service = await servicesService.deleteService(id);
      return res.json(service);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  static async showServicesFromUser(req: Request, res: Response) {
    const { id } = req.params;
    const servicesService = new ServicesService();

    try {
      const userAllServices = await servicesService.showServicesFromUser(id);
      return res.json(userAllServices);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }
}
