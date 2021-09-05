const isProduction = process.env.DB_ENVIRONMENT === "production";
module.exports = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
  entities: isProduction ? ["./dist/src/models/**.js"] : ["./src/models/**.ts"],
  migrations: isProduction
    ? ["./dist/src/database/migrations/**.js"]
    : ["./src/database/migrations/**.ts"],
  cli: {
    migrationsDir: "./src/database/migrations",
  },
};
