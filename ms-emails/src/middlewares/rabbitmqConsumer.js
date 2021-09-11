import RabbitmqServer from "../config/rabbitmq-server.js";
import { RabbitmqController } from "../controllers/RabbitmqController.js";

export const rabbitmqConsumer = async () => {
  const server = new RabbitmqServer("amqp://admin:admin@localhost:5672");
  await server.start();
  await server.consume("email", (message) => {
    const object = JSON.parse(message.content.toString());
    RabbitmqController.handleEvent(object);
  });
};
