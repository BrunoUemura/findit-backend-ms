import { Repository, getRepository } from "typeorm";
import { User } from "../models/User";
// import { ServiceCompleted } from "../models/ServiceCompleted";
// import { ServicesCompletedRepository } from "../repositories/ServicesCompletedRepository";
import { NotFoundError } from "../errors/NotFoundError";
import { BadRequestError } from "../errors/BadRequestError";
import RabbitmqServer from "../config/rabbitmq-server";

interface IUsersUpdate {
  type?: string;
  id?: string;
  name?: string;
  email?: string;
  password?: string;
}

interface IUsersCreate {
  id?: string;
  name: string;
  email: string;
  user_photo?: string;
  city?: string;
  state?: string;
  country?: string;
  phone?: string;
  occupation?: string;
  about_me?: string;
}

export class UsersService {
  private usersRepository: Repository<User>;
  // private servicesCompletedRepository: Repository<ServiceCompleted>;

  constructor() {
    this.usersRepository = getRepository(User);
    // this.servicesCompletedRepository = getCustomRepository(
    //   ServicesCompletedRepository
    // );
  }

  async checkUserExists(id: string) {
    const userExists = await this.usersRepository.find({
      where: { id },
    });

    if (!userExists) {
      throw new NotFoundError("User not found");
    }

    return userExists;
  }

  async showAllUsers() {
    return await this.usersRepository.find();
  }

  async showOneUser(id: string) {
    return await this.usersRepository.findOne(id);
  }

  async showUsersCount() {
    const [list, count] = await this.usersRepository.findAndCount();
    return count;
  }

  // async showUserCompletedServicesCount(id: string) {
  //   const [list, count] = await this.servicesCompletedRepository.findAndCount({
  //     where: {
  //       user_id: id,
  //     },
  //   });
  //   return count;
  // }

  async getProfileImage(id: string) {
    const userExists = await this.checkUserExists(id);

    const { user_photo } = userExists[0];

    return user_photo;
  }

  async createUser(userInfo: IUsersCreate) {
    const userExists = await this.usersRepository.findOne({
      where: { email: userInfo.email },
    });
    if (userExists) {
      throw new BadRequestError("User already registered");
    }

    const user = this.usersRepository.create({
      id: userInfo.id,
      name: userInfo.name,
      email: userInfo.email,
    });
    await this.usersRepository.save(user);
    return { message: `CREATED user id ${user.id}` };
  }

  async updateUser(id: string, userInfo: IUsersCreate) {
    const userExists = await this.usersRepository.findOne(id);

    if (!userExists) {
      throw new Error("User does not exist!");
    }

    await this.usersRepository.update(id, userInfo);

    const user: IUsersUpdate = {
      type: "UserUpdate",
      id,
      name: userInfo.name,
      email: userInfo.email,
    };
    const server = new RabbitmqServer("amqp://admin:admin@localhost:5672");
    await server.start();
    await server.publishInQueue("auth", JSON.stringify(user));
    // await server.publishInQueue("email", JSON.stringify(emailObject));
    await server.publishInExchange("amq.direct", "rota", JSON.stringify(user));

    return { message: `UPDATED user id ${id}` };
  }

  async uploadProfileImage(id: string, filename: string) {
    await this.checkUserExists(id);
    await this.usersRepository.update(id, { user_photo: filename });
    return { message: `UPDATED user id ${id} profile photo` };
  }

  async deleteUser(id: string) {
    await this.usersRepository.delete(id);
    return { message: `DELETED user id ${id}` };
  }
}
