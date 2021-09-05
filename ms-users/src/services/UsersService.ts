import { getCustomRepository, Repository } from "typeorm";
import { User } from "../models/User";
// import { ServiceCompleted } from "../models/ServiceCompleted";
import { UsersRepository } from "../repositories/UsersRepository";
// import { ServicesCompletedRepository } from "../repositories/ServicesCompletedRepository";
import { NotFound } from "../errors/NotFound";

interface IUsers {
  name?: string;
  email?: string;
  password?: string;
  user_photo?: string;
  city?: string;
  state?: string;
  country?: string;
  phone?: string;
  occupation?: string;
  about_me?: string;
  email_verified?: boolean;
}

interface IUsersCreate {
  name: string;
  email: string;
  password?: string;
  user_photo?: string;
  city?: string;
  state?: string;
  country?: string;
  phone?: string;
  occupation?: string;
  about_me?: string;
  email_verified?: boolean;
}

export class UsersService {
  private usersRepository: Repository<User>;
  // private servicesCompletedRepository: Repository<ServiceCompleted>;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
    // this.servicesCompletedRepository = getCustomRepository(
    //   ServicesCompletedRepository
    // );
  }

  async checkUserExists(id: string) {
    const userExists = await this.usersRepository.find({
      where: { id },
    });

    if (!userExists) {
      throw new NotFound("User");
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

  async showUserCompletedServicesCount(id: string) {
    // const [list, count] = await this.servicesCompletedRepository.findAndCount({
    //   where: {
    //     user_id: id,
    //   },
    // });
    // return count;
  }

  async getProfileImage(id: string) {
    const userExists = await this.checkUserExists(id);

    const { user_photo } = userExists[0];

    return user_photo;
  }

  async updateUser(id: string, userInfo: IUsersCreate) {
    const userExists = await this.usersRepository.findOne(id);

    if (!userExists) {
      throw new Error("User does not exist!");
    }

    await this.usersRepository.update(id, userInfo);

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
