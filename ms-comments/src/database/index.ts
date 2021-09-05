import { createConnection } from "typeorm";

createConnection()
  .then(() => console.log("Successfully connected to database"))
  .catch((error) => {
    console.log("Failed to connect to database");
    console.log(error);
  });
