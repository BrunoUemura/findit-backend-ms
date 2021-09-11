import { createConnection } from "typeorm";
import { DatabaseConnectionError } from "../errors/DatabaseConnectionError";
import { rabbitmqConsumer } from "../middlewares/rabbitmqConsumer";

createConnection()
  .then(() => {
    rabbitmqConsumer();
    console.log("Successfully connected to database");
  })
  .catch((error) => {
    console.log("Failed to connect to database");
    throw new DatabaseConnectionError();
  });
