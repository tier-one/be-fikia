import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangingPrecisionSize1701071332147 implements MigrationInterface {
  name = 'ChangingPrecisionSize1701071332147';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "fund" ALTER COLUMN "FundInitialValue" TYPE numeric(15,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund" ALTER COLUMN "FundLiabilities" TYPE numeric(15,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund" ALTER COLUMN "SharesOutstanding" TYPE numeric(15,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ALTER COLUMN "price" TYPE numeric(15,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ALTER COLUMN "value" TYPE numeric(15,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ALTER COLUMN "assetBalance" TYPE numeric(15,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ALTER COLUMN "fixedIncomeDetailsCouponrate" TYPE numeric(15,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ALTER COLUMN "fixedIncomeDetailsFacevalue" TYPE numeric(15,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ALTER COLUMN "fixedIncomeDetailsYieldtomaturity" TYPE numeric(15,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ALTER COLUMN "realEstateDetailsRentalincome" TYPE numeric(15,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset_balance" ALTER COLUMN "investorFundBalance" TYPE numeric(15,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset_balance" ALTER COLUMN "investorAssetBalance" TYPE numeric(15,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" ALTER COLUMN "amountInvested" TYPE numeric(15,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" ALTER COLUMN "numberOfShares" TYPE numeric(15,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund_transaction" ALTER COLUMN "amount" TYPE numeric(15,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund_transaction" ALTER COLUMN "price" TYPE numeric(15,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund_transaction" ALTER COLUMN "numberOfShares" TYPE numeric(15,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund_transaction" ALTER COLUMN "commission" TYPE numeric(15,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund_balance" ALTER COLUMN "fundBalance" TYPE numeric(15,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund_value" ALTER COLUMN "value" TYPE numeric(15,2)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "fund_value" ALTER COLUMN "value" TYPE numeric(10,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund_balance" ALTER COLUMN "fundBalance" TYPE numeric(10,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund_transaction" ALTER COLUMN "commission" TYPE numeric(10,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund_transaction" ALTER COLUMN "numberOfShares" TYPE numeric(10,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund_transaction" ALTER COLUMN "price" TYPE numeric(10,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund_transaction" ALTER COLUMN "amount" TYPE numeric(10,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" ALTER COLUMN "numberOfShares" TYPE numeric(10,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" ALTER COLUMN "amountInvested" TYPE numeric(10,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset_balance" ALTER COLUMN "investorAssetBalance" TYPE numeric(10,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset_balance" ALTER COLUMN "investorFundBalance" TYPE numeric(10,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ALTER COLUMN "realEstateDetailsRentalincome" TYPE numeric(10,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ALTER COLUMN "fixedIncomeDetailsYieldtomaturity" TYPE numeric(10,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ALTER COLUMN "fixedIncomeDetailsFacevalue" TYPE numeric(10,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ALTER COLUMN "fixedIncomeDetailsCouponrate" TYPE numeric(10,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ALTER COLUMN "assetBalance" TYPE numeric(10,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ALTER COLUMN "value" TYPE numeric(10,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ALTER COLUMN "price" TYPE numeric(10,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund" ALTER COLUMN "SharesOutstanding" TYPE numeric(10,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund" ALTER COLUMN "FundLiabilities" TYPE numeric(10,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund" ALTER COLUMN "FundInitialValue" TYPE numeric(10,2)`,
    );
  }
}
