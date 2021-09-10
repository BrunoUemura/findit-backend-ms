import { MigrationInterface, QueryRunner } from "typeorm";
import { v4 as uuidv4 } from "uuid";

export class SeedCategories1630710463997 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const query =
      "INSERT INTO categories (id, category, created_at, updated_at) VALUES ($1, $2, $3, $4)";

    await queryRunner.query(query, [
      uuidv4(),
      "Administração & Contabilidade",
      new Date(),
      new Date(),
    ]);

    await queryRunner.query(query, [
      uuidv4(),
      "Aulas & Treinamentos",
      new Date(),
      new Date(),
    ]);

    await queryRunner.query(query, [
      uuidv4(),
      "Automotivos",
      new Date(),
      new Date(),
    ]);

    await queryRunner.query(query, [
      uuidv4(),
      "Construção & Reformas",
      new Date(),
      new Date(),
    ]);

    await queryRunner.query(query, [
      uuidv4(),
      "Consultoria",
      new Date(),
      new Date(),
    ]);

    await queryRunner.query(query, [
      uuidv4(),
      "Design & AudioVisual",
      new Date(),
      new Date(),
    ]);

    await queryRunner.query(query, [
      uuidv4(),
      "Engenharia & Arquitetura",
      new Date(),
      new Date(),
    ]);

    await queryRunner.query(query, [
      uuidv4(),
      "Eventos",
      new Date(),
      new Date(),
    ]);

    await queryRunner.query(query, [
      uuidv4(),
      "Moda & Beleza",
      new Date(),
      new Date(),
    ]);

    await queryRunner.query(query, [
      uuidv4(),
      "Saúde & Bem estar",
      new Date(),
      new Date(),
    ]);

    await queryRunner.query(query, [
      uuidv4(),
      "Tecnologia",
      new Date(),
      new Date(),
    ]);

    await queryRunner.query(query, [
      uuidv4(),
      "Vendas & Marketing",
      new Date(),
      new Date(),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
