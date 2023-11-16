import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNewColumnIntoAssetTable1699901926485
  implements MigrationInterface
{
  name = 'AddNewColumnIntoAssetTable1699901926485';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "asset" ADD "equityDetailsIsin" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ADD "equityDetailsDescription" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ADD "equityDetailsExchange" character varying DEFAULT 'default_value' NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ADD "equityDetailsSectorindustry" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ADD "equityDetailsCountryofdomicile" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ADD "fixedIncomeDetailsFixedincometype" character varying`,
    );
    await queryRunner.query(
      `UPDATE "asset" SET "fixedIncomeDetailsFixedincometype" = 'default_value' WHERE "fixedIncomeDetailsFixedincometype" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ALTER COLUMN "fixedIncomeDetailsFixedincometype" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ADD "fixedIncomeDetailsIsin" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ADD "fixedIncomeDetailsFixedincomename" character varying`,
    );
    await queryRunner.query(
      `UPDATE "asset" SET "fixedIncomeDetailsFixedincomename" = 'default_value' WHERE "fixedIncomeDetailsFixedincomename" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ALTER COLUMN "fixedIncomeDetailsFixedincomename" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ADD "fixedIncomeDetailsDescription" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ADD COLUMN IF NOT EXISTS "equityDetailsCurrency" character varying`,
    );
    await queryRunner.query(
      `UPDATE "asset" SET "equityDetailsCurrency" = 'default_currency' WHERE "equityDetailsCurrency" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ADD "fixedIncomeDetailsCountryofissuer" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ADD "fixedIncomeDetailsEffectiveduration" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ADD "fixedIncomeDetailsAmortizationschedule" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ADD "fixedIncomeDetailsOptionality" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ADD "fixedIncomeDetailsCallableputtable" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ADD "fixedIncomeDetailsIssuedate" date`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ADD "fixedIncomeDetailsListingexchange" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ALTER COLUMN "equityDetailsTickersymbol" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ALTER COLUMN "equityDetailsCompanyname" SET NOT NULL`,
    );
 
    await queryRunner.query(
      `ALTER TABLE "asset" ALTER COLUMN "equityDetailsCurrency" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ALTER COLUMN "fixedIncomeDetailsIssuer" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ALTER COLUMN "fixedIncomeDetailsMaturitydate" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ALTER COLUMN "fixedIncomeDetailsCouponrate" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ALTER COLUMN "fixedIncomeDetailsFacevalue" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ALTER COLUMN "fixedIncomeDetailsYieldtomaturity" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "asset" ALTER COLUMN "fixedIncomeDetailsYieldtomaturity" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ALTER COLUMN "fixedIncomeDetailsFacevalue" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ALTER COLUMN "fixedIncomeDetailsCouponrate" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ALTER COLUMN "fixedIncomeDetailsMaturitydate" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ALTER COLUMN "fixedIncomeDetailsIssuer" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ALTER COLUMN "equityDetailsExchange" SET DEFAULT 'default_value'`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" DROP COLUMN "fixedIncomeDetailsCurrency"`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ALTER COLUMN "equityDetailsCompanyname" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ALTER COLUMN "equityDetailsTickersymbol" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" DROP COLUMN "fixedIncomeDetailsListingexchange"`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" DROP COLUMN "fixedIncomeDetailsIssuedate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" DROP COLUMN "fixedIncomeDetailsCallableputtable"`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" DROP COLUMN "fixedIncomeDetailsOptionality"`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" DROP COLUMN "fixedIncomeDetailsAmortizationschedule"`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" DROP COLUMN "fixedIncomeDetailsEffectiveduration"`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" DROP COLUMN "fixedIncomeDetailsCountryofissuer"`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" DROP COLUMN "fixedIncomeDetailsCurrency"`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" DROP COLUMN "fixedIncomeDetailsDescription"`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" DROP COLUMN "fixedIncomeDetailsFixedincomename"`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" DROP COLUMN "fixedIncomeDetailsIsin"`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" DROP COLUMN "fixedIncomeDetailsFixedincometype"`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" DROP COLUMN "equityDetailsCountryofdomicile"`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" DROP COLUMN "equityDetailsSectorindustry"`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" DROP COLUMN "equityDetailsExchange"`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" DROP COLUMN "equityDetailsDescription"`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" DROP COLUMN "equityDetailsIsin"`,
    );
  }
}
