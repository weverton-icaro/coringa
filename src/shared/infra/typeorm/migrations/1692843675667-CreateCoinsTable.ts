import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createCoinsTable1692843675667 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "coins",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment"
          },
          {
            name: "userId",
            type: "integer",
            isNullable: false
          },
          {
            name: "type",
            type: "varchar", // TODO: FIAT OR CRIPTO
            isNullable: false
          },
          {
            name: "isEnabled",
            type: "tinyint",
            default: true
          },
          {
            name: "isDeleted",
            type: "tinyint",
            default: false
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: "now()"
          },
          {
            name: "updatedAt",
            type: "timestamp",
            default: "now()"
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
  }

}
