import { MigrationInterface, QueryRunner } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

export class SeedUsers1630710449951 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const password = "test";
    const query =
      "INSERT INTO users (id, name, email, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)";

    await queryRunner.query(query, [
      uuidv4(),
      "Bruno Uemura",
      "bruno.uemura@gmail.com",
      new Date(),
      new Date(),
    ]);

    await queryRunner.query(query, [
      uuidv4(),
      "José Lacerda",
      "jose.lacerda@gmail.com",
      new Date(),
      new Date(),
    ]);

    await queryRunner.query(query, [
      uuidv4(),
      "Linus Lorvalds",
      "linus.torvalds@gmail.com",
      new Date(),
      new Date(),
    ]);

    await queryRunner.query(query, [
      uuidv4(),
      "Bill Gates",
      "bill.gates@gmail.com",
      new Date(),
      new Date(),
    ]);

    await queryRunner.query(query, [
      uuidv4(),
      "Elon Musk",
      "elon.musk@gmail.com",
      new Date(),
      new Date(),
    ]);

    await queryRunner.query(query, [
      uuidv4(),
      "Mark Zuckerberg",
      "mark.zuckerberg@gmail.com",
      new Date(),
      new Date(),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
