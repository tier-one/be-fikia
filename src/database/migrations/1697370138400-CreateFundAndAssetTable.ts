import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFundAndAssetTable1697370138400
  implements MigrationInterface
{
  name = 'CreateFundAndAssetTable1697370138400';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "fund" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "FundName" character varying NOT NULL, "FundGoal" character varying NOT NULL, "FundSymbol" character varying NOT NULL, "FundType" character varying NOT NULL, "FundLogo" character varying NOT NULL, "AccoutDepositoryBankName" character varying NOT NULL, "AccountDepositoryAccountNumber" character varying NOT NULL, "CashAccountBankName" character varying NOT NULL, "CashAccountNumber" character varying NOT NULL, "CustodianBankName" character varying NOT NULL, "CustodianParcentage" integer NOT NULL, "TrustBankName" character varying NOT NULL, "TrustPercentage" integer NOT NULL, "ManagementFee" numeric(5,2) DEFAULT '0', "FundInitialValue" numeric(10,2) DEFAULT '0', "FundLiabilities" numeric(10,2) DEFAULT '0', "SharesOutstanding" numeric(10,2) DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "managerId" uuid, CONSTRAINT "PK_b3ac6e413e6e449bb499db1ccbc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "asset" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "price" numeric(10,2) NOT NULL, "value" numeric(10,2) NOT NULL DEFAULT '0', "assetBalance" numeric(10,2) NOT NULL DEFAULT '0', "note" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "investorId" uuid, "fundId" uuid, "equityDetailsTickersymbol" character varying, "equityDetailsCompanyname" character varying, "equityDetailsNumberofoutstandingshares" integer, "equityDetailsAssetclass" character varying, "equityDetailsCurrency" character varying, "fixedIncomeDetailsBondtype" character varying, "fixedIncomeDetailsIssuer" character varying, "fixedIncomeDetailsFacevalue" numeric(10,2), "fixedIncomeDetailsMaturitydate" date, "fixedIncomeDetailsCouponrate" numeric(10,2), "fixedIncomeDetailsPaymentfrequency" character varying, "fixedIncomeDetailsYieldtomaturity" numeric(10,2), "fixedIncomeDetailsCreditrating" character varying, "realEstateDetailsPropertyaddress" character varying, "realEstateDetailsPropertytype" character varying, "realEstateDetailsRentalincome" numeric(10,2), "alternativeInvestmentDetailsInvestmentfundname" character varying, "alternativeInvestmentDetailsInvestmentmanager" character varying, "alternativeInvestmentDetailsFundstrategy" character varying, CONSTRAINT "PK_1209d107fe21482beaea51b745e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "asset_balance" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "investorFundBalance" numeric(10,2) NOT NULL DEFAULT '0', "investorAssetBalance" numeric(10,2) NOT NULL DEFAULT '0', "investorId" uuid, CONSTRAINT "PK_7ffc793d0d7d680c10e4741f173" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "fund_balance" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fundBalance" numeric(10,2) NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "managerId" uuid, "fundId" uuid, CONSTRAINT "PK_d9ee1221adeaff718b5cd871da3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "fund_value" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" numeric(10,2) NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "fundId" uuid, CONSTRAINT "PK_aead419629d97b7f52ac9c44355" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund" ADD CONSTRAINT "FK_9ddcb769316ab95468542f49418" FOREIGN KEY ("managerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ADD CONSTRAINT "FK_7a4be6c7e5fd8a3ecb3624bb786" FOREIGN KEY ("investorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ADD CONSTRAINT "FK_6d1faf0b85c179cdde1bc0e2d0c" FOREIGN KEY ("fundId") REFERENCES "fund"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset_balance" ADD CONSTRAINT "FK_17ff7da54a69ec8b79244b251a8" FOREIGN KEY ("investorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund_balance" ADD CONSTRAINT "FK_3cfd62973112e1230b8f9d0ebeb" FOREIGN KEY ("managerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund_balance" ADD CONSTRAINT "FK_a08080f619e00b5dbb9d412f9da" FOREIGN KEY ("fundId") REFERENCES "fund"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund_value" ADD CONSTRAINT "FK_8cc62a1ae8680cb8318af540120" FOREIGN KEY ("fundId") REFERENCES "fund"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "fund_value" DROP CONSTRAINT "FK_8cc62a1ae8680cb8318af540120"`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund_balance" DROP CONSTRAINT "FK_a08080f619e00b5dbb9d412f9da"`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund_balance" DROP CONSTRAINT "FK_3cfd62973112e1230b8f9d0ebeb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset_balance" DROP CONSTRAINT "FK_17ff7da54a69ec8b79244b251a8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" DROP CONSTRAINT "FK_6d1faf0b85c179cdde1bc0e2d0c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" DROP CONSTRAINT "FK_7a4be6c7e5fd8a3ecb3624bb786"`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund" DROP CONSTRAINT "FK_9ddcb769316ab95468542f49418"`,
    );
    await queryRunner.query(`DROP TABLE "fund_value"`);
    await queryRunner.query(`DROP TABLE "fund_balance"`);
    await queryRunner.query(`DROP TABLE "asset_balance"`);
    await queryRunner.query(`DROP TABLE "asset"`);
    await queryRunner.query(`DROP TABLE "fund"`);
  }
}
