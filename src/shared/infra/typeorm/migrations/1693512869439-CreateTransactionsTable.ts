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
            name: "token",
            type: "varchar"
          },
          {
            name: "transactionUuid",
            type: "varchar"
          },
          {
            name: "supplierUser",
            type: "varchar"
          },
          {
            name: "roundClosed",
            type: "tinyint",
          },
          {
            name: "round",
            type: "varchar"
          },
          {
            name: "requestUuid",
            type: "varchar"
          },
          {
            name: "isFree",
            type: "tinyint"
          },
          {
            name: "gameId",
            type: "int"
          },
          {
            name: "gameCode",
            type: "varchar"
          },
          {
            name: "currency",
            type: "varchar"
          },
          {
            name: "campaignUuid",
            type: "varchar"
          },
          {
            name: "rewardUuid",
            type: "varchar"
          },
          {
            name: "bet",
            type: "varchar"
          },
          {
            name: "amount",
            type: "bigint"
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
    const tableExist = await queryRunner.hasTable('transactions');
    if (!tableExist) {
      await queryRunner.dropTable('transactions');
    }
  }

}
