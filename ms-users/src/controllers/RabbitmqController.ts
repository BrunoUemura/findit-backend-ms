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
    // Check event type
    if (message.type === "UserCreation") {
      const userService = new UsersService();
      userService.createUser(message);
      return;
    }

    console.log(`No action on event`);
    return;
  }
}
