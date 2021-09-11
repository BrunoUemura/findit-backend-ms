import { sendEmail } from "./EmailSenderController.js";

export class RabbitmqController {
  static async handleEvent(message) {
    switch (message.type) {
      case "UserCreation":
        sendEmail(message);
        break;

      default:
        console.log(`No action on event`);
        break;
    }
  }
}
