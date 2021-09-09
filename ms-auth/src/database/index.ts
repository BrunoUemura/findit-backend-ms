import { createConnection } from "typeorm";
import { DatabaseConnectionError } from "../errors/DatabaseConnectionError";

createConnection()
  .then(() => console.log("Successfully connected to database"))
  .catch((error) => {
    console.log("Failed to connect to database");
    throw new DatabaseConnectionError();
  });
