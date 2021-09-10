import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateComments1630622833427 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "comments",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "service_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "sender_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "comment",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "deleted_at",
            type: "timestamp",
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: "FKServices",
            referencedTableName: "services",
            referencedColumnNames: ["id"],
            columnNames: ["service_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
          {
            name: "FKUsers",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["sender_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("comments");
  }
}
