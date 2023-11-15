import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCurrencyColumnsIntoAssetTable1700035335091
  implements MigrationInterface
{
  name = 'AddCurrencyColumnsIntoAssetTable1700035335091';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "asset" ADD COLUMN IF NOT EXISTS "equityDetailsCurrency" character varying`,
    );
    await queryRunner.query(
      `UPDATE "asset" SET "equityDetailsCurrency" = 'default_currency' WHERE "equityDetailsCurrency" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ALTER COLUMN "equityDetailsCurrency" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "asset" ALTER COLUMN "equityDetailsExchange" SET DEFAULT 'default_value'`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" DROP COLUMN "fixedIncomeDetailsCurrency"`,
    );
  }
}
