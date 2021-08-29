const NotFound = require("../errors/NotFound");
const database = require("../database/models");

async function checkServiceExists(id) {
  const serviceExists = await database.Services.findOne({ where: { id } });

  if (!serviceExists) {
    throw new NotFound("Service");
  }

  return serviceExists;
}

class ServicesService {
  async createService(serviceInfo) {
    const userExists = await database.Users.findOne({
      where: { id: serviceInfo.user_id },
    });

    if (!userExists) {
      throw new NotFound("User associated");
    }

    await database.Services.create(serviceInfo);
    return { message: `Service created successfully!` };
  }

  async showAllServices(where) {
    return await database.Services.findAll({
      where: { ...where },
      include: {
        model: database.Users,
        as: "User",
        attributes: [
          "id",
          "name",
          "email",
          "user_photo",
          "city",
          "state",
          "country",
          "phone",
          "occupation",
          "about_me",
          "email_verified",
          "createdAt",
          "updatedAt",
          "deletedAt",
        ],
      },
    });
  }

  async showOneService(id) {
    return await database.Services.findOne({
      where: { id },
      include: {
        model: database.Users,
        as: "User",
      },
    });
  }

  async showServicesQuantity() {
    const { count } = await database.Services.findAndCountAll();
    return count;
  }

  async showServicesCategories() {
    return await database.Categories.findAll();
  }

  async updateService(serviceInfo, id) {
    await checkServiceExists(id);

    await database.Services.update(serviceInfo, { where: { id } });
    return { message: `UPDATED service id ${id}` };
  }

  async deleteService(id) {
    await checkServiceExists(id);

    await database.Services.destroy({ where: { id } });
    return { message: `DELETED service id ${id}` };
  }

  async showServicesFromUser(user_id) {
    const userExists = await database.Users.findOne({
      where: { id: user_id },
    });

    if (!userExists) {
      throw new NotFound("User associated");
    }

    return await database.Services.findAll({
      where: { user_id },
      include: {
        model: database.Users,
        as: "User",
      },
    });
  }
}

module.exports = ServicesService;
