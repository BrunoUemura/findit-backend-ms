import { AuthService } from "../services/AuthService";

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
    if (message.type === "UserUpdate") {
      const authService = new AuthService();
      authService.updateUser(message);
      return;
    }

    console.log(`No action`);
    return;
  }
}
