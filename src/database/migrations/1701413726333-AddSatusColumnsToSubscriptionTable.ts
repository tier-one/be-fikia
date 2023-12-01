import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSatusColumnsToSubscriptionTable1701413726333
  implements MigrationInterface
{
  name = 'AddSatusColumnsToSubscriptionTable1701413726333';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subscription" ADD "status" character varying NOT NULL DEFAULT 'pending'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "subscription" DROP COLUMN "status"`);
  }
}
