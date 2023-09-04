import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createCoinsTable1692843675667 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(
            new Table({
                name: 'coins',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'type',
                        type: 'varchar', // TODO: FIAT OR CRIPTO  BRL, EUR e USD
                        isNullable: false,
                    },
                    {
                        name: 'isEnabled',
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
        const tableExist = await queryRunner.hasTable('coins')
        if (!tableExist) {
            await queryRunner.dropTable('coins')
        }
    }
}
