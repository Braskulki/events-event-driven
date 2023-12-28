import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddAddressTable1698155552014 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'address',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'street',
            type: 'varchar'
          },
          {
            name: 'number',
            type: 'varchar'
          },
          {
            name: 'complement',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'neighborhood',
            type: 'varchar'
          },
          {
            name: 'city',
            type: 'varchar'
          },
          {
            name: 'state',
            type: 'varchar'
          },
          {
            name: 'country',
            type: 'varchar'
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
        ]
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('address', true);
  }

}
