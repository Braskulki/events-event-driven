import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddPaymentStatus1701286852762 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'ticket',
      new TableColumn({
        name: 'payment_status',
        type: 'int4',
        default: 1
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('ticket', 'payment_status');
  }

}
