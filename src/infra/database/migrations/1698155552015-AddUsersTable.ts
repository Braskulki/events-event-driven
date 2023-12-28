import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddUsersTable1698155552015 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
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
            name: 'email',
            type: 'varchar'
          },
          {
            name: 'id_address',
            type: 'varchar',
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
        ]
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user', true);
  }

}
