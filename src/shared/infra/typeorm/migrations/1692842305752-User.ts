import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class user1692842305752 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const tableExist = await queryRunner.hasTable('users');
    if (!tableExist) {
      await queryRunner.createTable(
        new Table({
          name: 'users',
          columns: [
            {
              name: "id",
              type: "integer",
              isPrimary: true,
              isGenerated: true,
              generationStrategy: "increment",
            },
            {
              name: 'username',
              type: 'varchar',
            },
            {
              name: 'email',
              type: 'varchar',
              isUnique: true,
            },
            {
              name: 'password',
              type: 'varchar',
            },
            {
              name: 'active',
              type: 'tinyint',
              default: true,
            },
            {
              name: 'admin',
              type: 'tinyint',
              default: false,
            },
            {
              name: 'pixKey',
              type: 'varchar',
              isNullable: true
            },
            {
              name: 'phone',
              type: 'varchar',
              isNullable: true
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
        })
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const tableExist = await queryRunner.hasTable('users');
    if (!tableExist) {
      await queryRunner.dropTable('users');
    }
  }

}
