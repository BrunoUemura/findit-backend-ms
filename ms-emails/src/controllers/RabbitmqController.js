import { sendEmail } from "./EmailSenderController.js";

export class RabbitmqController {
  static async handleEvent(message) {
    // Check event type
    if (message.type === "UserCreation") {
      sendEmail(message);
      return;
    }

    console.log(`No action`);
    return;
  }
}
