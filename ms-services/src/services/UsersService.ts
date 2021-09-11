import { Repository, getRepository } from "typeorm";
import { User } from "../models/User";
// import { ServiceCompleted } from "../models/ServiceCompleted";
// import { ServicesCompletedRepository } from "../repositories/ServicesCompletedRepository";
import { NotFoundError } from "../errors/NotFoundError";
import { BadRequestError } from "../errors/BadRequestError";

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

interface IUsersUpdate {
  type?: string;
  id?: string;
  name?: string;
  email?: string;
  password?: string;
}

interface IUsersDelete {
  type: string;
  id: string;
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

    console.log(`CREATED user id ${user.id}`);
    return { message: `CREATED user id ${user.id}` };
  }

  async updateUser(userToUpdate: IUsersUpdate) {
    await this.usersRepository.update(userToUpdate.id, {
      name: userToUpdate.name,
    });
    console.log(`UPDATED user id ${userToUpdate.id}`);
    return { message: `UPDATED user id ${userToUpdate.id}` };
  }

  async deleteUser(userToDelete: IUsersDelete) {
    const userToRemove = await this.usersRepository.findOne(userToDelete.id);
    if (!userToRemove) {
      throw new NotFoundError("User not found");
    }
    await this.usersRepository.softRemove(userToRemove);
    console.log(`DELETED user id ${userToRemove.id}`);
    return { message: `DELETED user id ${userToRemove.id}` };
  }
}
