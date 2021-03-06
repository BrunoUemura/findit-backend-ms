import RabbitmqServer from "../config/rabbitmq-server";
import { RabbitmqController } from "../controllers/RabbitmqController";

export const rabbitmqConsumer = async () => {
  const server = new RabbitmqServer(process.env.RABBITMQ_URL);
  await server.start();
  await server.consume("auth", async (message) => {
    const object = JSON.parse(message.content.toString());
    await RabbitmqController.handleEvent(object);
  });
};
