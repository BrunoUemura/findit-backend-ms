import { UsersService } from "../services/UsersService";

interface IUsersCreate {
  type: string;
  id: string;
  name: string;
  email: string;
  password?: string;
}

export class RabbitmqController {
  static async handleEvent(message: IUsersCreate) {
    const usersService = new UsersService();

    switch (message.type) {
      case "UserCreation":
        await usersService.createUser(message);
        break;

      default:
        console.log(`No action on event`);
        break;
    }
  }
}
