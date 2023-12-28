import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class AddEventsTable1698322244129 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'event',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'administrators',
            type: 'uuid',
            isArray: true,
            isNullable: true
          },
          {
            name: 'ticket_limit',
            type: 'int4',
            default: 0
          },
          {
            name: 'ticket_price',
            type: 'numeric',
            default: 0
          },
          {
            name: 'start_date',
            type: 'timestamptz',
            isNullable: true
          },
          {
            name: 'end_date',
            type: 'timestamptz',
            isNullable: true
          },
          {
            name: 'id_address',
            type: 'uuid',
            isNullable: true
          },
          {
            name: 'created_by',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'created_at',
            type: 'timestamptz',
            default: 'now()'
          },
          {
            name: 'updated_by',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'updated_at',
            type: 'timestamptz',
            default: 'now()'
          },
          {
            name: 'deleted_at',
            type: 'timestamptz',
            isNullable: true
          }
        ],
        foreignKeys: [
          new TableForeignKey({
            columnNames: ['id_address'],
            referencedColumnNames: ['id'],
            referencedTableName: 'address'
          })
        ]
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('event', true);
  }

}
