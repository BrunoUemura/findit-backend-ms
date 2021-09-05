import { MigrationInterface, QueryRunner } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

export class SeedUsers1630710449951 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const password = "test";
    const query =
      "INSERT INTO users (id, name, email, password, city, state, country, phone, occupation, about_me, email_verified, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)";

    await queryRunner.query(query, [
      uuidv4(),
      "Bruno Uemura",
      "bruno.uemura@gmail.com",
      await bcrypt.hash(password, 10),
      "Campinas",
      "São Paulo",
      "Brazil",
      "+55 19 99999-9999",
      "Software Engineer",
      "I am a Software Engineer",
      true,
      new Date(),
      new Date(),
    ]);

    await queryRunner.query(query, [
      uuidv4(),
      "José Lacerda",
      "jose.lacerda@gmail.com",
      await bcrypt.hash(password, 10),
      "Sumaré",
      "São Paulo",
      "Brazil",
      "+55 19 99999-8888",
      "Frotend Developer",
      "I am a Frotend Developer",
      true,
      new Date(),
      new Date(),
    ]);

    await queryRunner.query(query, [
      uuidv4(),
      "Linus Lorvalds",
      "linus.torvalds@gmail.com",
      await bcrypt.hash(password, 10),
      "Helsinki",
      "SF",
      "Finland",
      "+55 19 99999-7777",
      "Software Engineer",
      "I am the creator of Linux Operating System",
      true,
      new Date(),
      new Date(),
    ]);

    await queryRunner.query(query, [
      uuidv4(),
      "Bill Gates",
      "bill.gates@gmail.com",
      await bcrypt.hash(password, 10),
      "Seattle",
      "Washington, D.C.",
      "USA",
      "+55 19 99999-6666",
      "CEO at Microsoft",
      "I am the CEO of Microsoft",
      true,
      new Date(),
      new Date(),
    ]);

    await queryRunner.query(query, [
      uuidv4(),
      "Elon Musk",
      "elon.musk@gmail.com",
      await bcrypt.hash(password, 10),
      "Pretoria",
      "Gauteng",
      "South Africa",
      "+55 19 99999-5555",
      "CEO at Tesla",
      "I am the CEO of Tesla",
      true,
      new Date(),
      new Date(),
    ]);

    await queryRunner.query(query, [
      uuidv4(),
      "Mark Zuckerberg",
      "mark.zuckerberg@gmail.com",
      await bcrypt.hash(password, 10),
      "White Plains",
      "New York",
      "USA",
      "+55 19 99999-4444",
      "CEO at Facebook",
      "I am the founder of Facebook",
      true,
      new Date(),
      new Date(),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
