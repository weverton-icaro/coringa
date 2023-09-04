import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createProvidersTable1693315775549 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(
            new Table({
                name: 'providers',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'slug',
                        type: 'longtext',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'module',
                        type: 'varchar',
                    },
                    {
                        name: 'url',
                        type: 'longtext',
                    },
                    {
                        name: 'public_key',
                        type: 'varchar',
                    },
                    {
                        name: 'able', // able = habilitado
                        type: 'tinyint',
                        default: true,
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
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        const tableExist = await queryRunner.hasTable('providers')
        if (!tableExist) {
            await queryRunner.dropTable('providers')
        }
    }
}
