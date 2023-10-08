import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddingInitialValueColumnOnFundTable1696759912461
  implements MigrationInterface
{
  name = 'AddingInitialValueColumnOnFundTable1696759912461';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "fund" ADD "initialValue" numeric(10,2) NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "fund" DROP COLUMN "initialValue"`);
  }
}
