import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class AddTicketTable1698674324067 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ticket',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'id_event',
            type: 'uuid'
          },
          {
            name: 'id_user',
            type: 'uuid'
          },
          {
            name: 'payment_type',
            type: 'int4'
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
            columnNames: ['id_event'],
            referencedColumnNames: ['id'],
            referencedTableName: 'event'
          }),
          new TableForeignKey({
            columnNames: ['id_user'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user'
          })
        ]
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('ticket', true);
  }

}
