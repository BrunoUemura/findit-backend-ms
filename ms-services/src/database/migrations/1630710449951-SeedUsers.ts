import { MigrationInterface, QueryRunner } from "typeorm";
import { v4 as uuidv4 } from "uuid";

export class SeedUsers1630710449951 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const query =
      "INSERT INTO users (id, name, email, user_photo, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6)";

    await queryRunner.query(query, [
      "fdb709c7-6715-4758-a51c-9edbfd34ad85",
      "Bruno Uemura",
      "bruno.uemura@gmail.com",
      null,
      new Date(),
      new Date(),
    ]);

    await queryRunner.query(query, [
      "3cfe35ca-7156-4513-af6a-cc846179c8be",
      "José Lacerda",
      "jose.lacerda@gmail.com",
      null,
      new Date(),
      new Date(),
    ]);

    await queryRunner.query(query, [
      "be39e9d9-8318-44b5-a5e4-06c1741cb6d6",
      "Linus Lorvalds",
      "linus.torvalds@gmail.com",
      null,
      new Date(),
      new Date(),
    ]);

    await queryRunner.query(query, [
      "6bde487f-5cad-45ea-995c-ea4eff6fde79",
      "Bill Gates",
      "bill.gates@gmail.com",
      null,
      new Date(),
      new Date(),
    ]);

    await queryRunner.query(query, [
      "1b4c8ab3-bcf3-4390-98c7-312a664759c4",
      "Elon Musk",
      "elon.musk@gmail.com",
      null,
      new Date(),
      new Date(),
    ]);

    await queryRunner.query(query, [
      "ed82cae9-c6b0-4e5d-95df-89efd56335df",
      "Mark Zuckerberg",
      "mark.zuckerberg@gmail.com",
      null,
      new Date(),
      new Date(),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
