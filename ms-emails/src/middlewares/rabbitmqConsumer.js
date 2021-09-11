import RabbitmqServer from "../config/rabbitmq-server.js";
import { RabbitmqController } from "../controllers/RabbitmqController.js";

export const rabbitmqConsumer = async () => {
  const server = new RabbitmqServer(process.env.RABBITMQ_URL);
  await server.start();
  await server.consume("email", (message) => {
    const object = JSON.parse(message.content.toString());
    RabbitmqController.handleEvent(object);
  });
};
