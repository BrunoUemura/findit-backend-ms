import { getRepository, Like, Repository } from "typeorm";
import { Service } from "../models/Service";
import { ServiceCompleted } from "../models/ServiceCompleted";
import { User } from "../models/User";
import { NotFoundError } from "../errors/NotFoundError";

interface IServicesCreate {
  user_id: string;
  title: string;
  category: string;
  description: string;
  price: string;
  city: string;
  state: string;
  country: string;
}

interface IServicesCompleted {
  user_id: string;
  service_id: string;
}

export class ServicesService {
  private servicesRepository: Repository<Service>;
  private servicesCompletedRepository: Repository<ServiceCompleted>;
  private usersRepository: Repository<User>;

  constructor() {
    this.servicesRepository = getRepository(Service);
    this.servicesCompletedRepository = getRepository(ServiceCompleted);
    this.usersRepository = getRepository(User);
  }

  async checkServiceExists(id: string) {
    const serviceExists = await this.servicesRepository.findOne({
      where: { id },
    });

    if (!serviceExists) {
      throw new NotFoundError("Service not found");
    }

    return serviceExists;
  }

  async showAllServices(where: any) {
    const {
      title = "%",
      category = "%",
      city = "%",
      state = "%",
      country = "%",
    } = where;

    if (Object.keys(where).length === 0) {
      return await this.servicesRepository.find({
        order: {
          updated_at: "DESC",
        },
        relations: ["user"],
      });
    }

    return await this.servicesRepository.find({
      relations: ["user"],
      where: {
        title: Like(`%${title}%`),
        category: Like(`%${category}%`),
        city: Like(`%${city}%`),
        state: Like(`%${state}%`),
        country: Like(`%${country}%`),
      },
      order: {
        updated_at: "DESC",
      },
    });
  }

  async showOneService(id: string) {
    return await this.servicesRepository.findOne(id, { relations: ["user"] });
  }

  async showServicesQuantity() {
    const [_, count] = await this.servicesRepository.findAndCount();
    return count;
  }

  async createService(serviceInfo: IServicesCreate) {
    const userExists = await this.usersRepository.findOne({
      where: { id: serviceInfo.user_id },
    });
    if (!userExists) {
      throw new NotFoundError("User associated not found");
    }

    const services = this.servicesRepository.create(serviceInfo);
    await this.servicesRepository.save(services);
    return services;
  }

  async completeService(serviceCompleted: IServicesCompleted) {
    const userExists = await this.usersRepository.findOne({
      where: { id: serviceCompleted.user_id },
    });
    if (!userExists) {
      throw new NotFoundError("User associated not found");
    }

    const completed = this.servicesCompletedRepository.create(serviceCompleted);
    await this.servicesCompletedRepository.save(completed);
    await this.servicesRepository.update(serviceCompleted.service_id, {
      completed: true,
    });
    return { message: "Service completed successfully" };
  }

  async updateService(id: string, serviceInfo: IServicesCreate) {
    const serviceExists = await this.servicesRepository.findOne(id);
    if (!serviceExists) {
      throw new NotFoundError("Service not found");
    }

    await this.checkServiceExists(id);
    await this.servicesRepository.update(id, serviceInfo);
    return { message: `UPDATED service id ${id}` };
  }

  async deleteService(id: string) {
    const serviceToRemove = await this.servicesRepository.findOne(id);
    if (!serviceToRemove) {
      throw new NotFoundError("Service not found");
    }

    await this.servicesRepository.softRemove(serviceToRemove);
    return { message: `DELETED service id ${id}` };
  }

  async showServicesFromUser(id: string) {
    const userExists = await this.usersRepository.findOne({
      where: { id },
    });
    if (!userExists) {
      throw new NotFoundError("User associated not found");
    }
    return await this.servicesRepository.find({
      where: { user_id: id },
      order: {
        updated_at: "DESC",
      },
      relations: ["user"],
    });
  }
}
