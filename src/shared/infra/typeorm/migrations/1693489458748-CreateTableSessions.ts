import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createTableSessions1693489458748 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "sessions",
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
            name: "coinId",
            type: "integer",
            isNullable: false
          },
          {
            name: "gameId",
            type: "integer",
            isNullable: false
          },
          {
            name: "token",
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
            name: "fk_sessions_users",
            columnNames: ["userId"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
          },
          {
            name: "fk_sessions_coins",
            columnNames: ["coinId"],
            referencedTableName: "coins",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
          },
          {
            name: "fk_sessions_games",
            columnNames: ["gameId"],
            referencedTableName: "games",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
          }
        ]
      }))
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const tableExist = await queryRunner.hasTable('sessions');
    if (!tableExist) {
      await queryRunner.dropTable('sessions');
    }
  }

}
