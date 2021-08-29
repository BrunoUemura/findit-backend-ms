const ServicesService = require("../services/ServicesService");
const { StatusCodes } = require("http-status-codes");

class ServicesController {
  static async showAllServices(req, res) {
    const servicesService = new ServicesService();
    const { category, city, state, country } = req.query;
    const where = {};

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

  static async showOneService(req, res) {
    const { id } = req.params;
    const servicesService = new ServicesService();

    try {
      const services = await servicesService.showOneService(id);
      return res.json(services);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  static async showServicesQuantity(req, res) {
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

  static async showServicesCategories(_, res) {
    const servicesService = new ServicesService();

    try {
      const categories = await servicesService.showServicesCategories();
      return res.json(categories);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  static async createService(request, response) {
    const serviceInfo = request.body;
    const servicesService = new ServicesService();

    try {
      const services = await servicesService.createService(serviceInfo);
      return response.json(services);
    } catch (error) {
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  static async updateService(req, res) {
    const { id } = req.params;
    const serviceInfo = req.body;
    const servicesService = new ServicesService();

    try {
      const service = await servicesService.updateService(serviceInfo, id);
      return res.json(service);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  static async deleteService(req, res) {
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

  static async showServicesFromUser(req, res) {
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

module.exports = ServicesController;
