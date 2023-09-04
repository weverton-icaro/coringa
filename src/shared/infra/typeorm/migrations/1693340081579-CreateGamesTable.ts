import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createGamesTable1693340081579 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'games',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'gameId',
            type: 'integer',
          },
          {
            name: 'gameCode',
            type: 'varchar',
          },
          {
            name: 'enabled',
            type: 'tinyint',
            default: true,
          },
          {
            name: 'category',
            type: 'varchar',
          },
          {
            name: 'urlThumb',
            type: 'longtext',
          },
          {
            name: 'urlSquareThumb',
            type: 'longtext',
          },
          {
            name: 'urlBackground',
            type: 'longtext',
          },
          {
            name: 'providerId',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'fk_games_providers',
            columnNames: ['providerId'],
            referencedTableName: 'providers',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const tableExist = await queryRunner.hasTable('games');
    if (!tableExist) {
      await queryRunner.dropTable('games');
    }
  }
}
