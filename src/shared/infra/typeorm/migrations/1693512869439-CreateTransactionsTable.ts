import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createTransactionsTable1693512869439 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {

    await queryRunner.createTable(
      new Table({
        name: "transactions",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment"
          },
          {
            name: "requestUuid",
            type: "varchar"
          },
          {
            name: "sessionId",
            type: "int"
          },
          {
            name: "amount",
            type: "bigint"
          },
          {
            name: "header",
            type: "varchar"
          },
          {
            name: "payload",
            type: "varchar"
          },
          {
            name: "response",
            type: "varchar"
          },
          {
            name: "responseHeader",
            type: "varchar"
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

        ],
        foreignKeys: [
          {
            name: "FK_sessions_transactions",
            columnNames: ["sessionId"],
            referencedTableName: "sessions",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
          }
        ]

      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const tableExist = await queryRunner.hasTable('transactions');
    if (!tableExist) {
      await queryRunner.dropTable('transactions');
    }
  }

}
