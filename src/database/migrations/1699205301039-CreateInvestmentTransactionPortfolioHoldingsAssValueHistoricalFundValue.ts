import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInvestmentTransactionPortfolioHoldingsAssValueHistoricalFundValue1699205301039 implements MigrationInterface {
    name = 'CreateInvestmentTransactionPortfolioHoldingsAssValueHistoricalFundValue1699205301039'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "investment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "portfolioId" character varying NOT NULL, "amount" numeric(10,2) NOT NULL, "investmentDate" TIMESTAMP NOT NULL, "investorId" uuid, "fundId" uuid, "assetId" uuid, CONSTRAINT "PK_ad085a94bd56e031136925f681b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transaction" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" numeric(10,2) NOT NULL, "transactionDate" TIMESTAMP NOT NULL, "transactionType" character varying NOT NULL, "portfolioId" character varying NOT NULL, "investorId" uuid, "fundId" uuid, "assetId" uuid, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "portfolio" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "investorId" uuid, "fundId" uuid, CONSTRAINT "PK_6936bb92ca4b7cda0ff28794e48" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "holdings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" numeric(10,2) NOT NULL, "investorId" uuid, "fundId" uuid, "assetId" uuid, CONSTRAINT "PK_df4e42f95014be15a4ccc8547c0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "current_asset_values" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "currentValue" numeric(10,2) NOT NULL, "assetId" uuid, CONSTRAINT "PK_36d6f44e40c310d832e741c1712" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "historical_data" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" numeric(10,2) NOT NULL, "date" TIMESTAMP NOT NULL, "assetId" uuid, CONSTRAINT "PK_d6303a200d1d9dc8f3bcb857331" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fund_value_nav" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nav" numeric(10,2) NOT NULL, "date" TIMESTAMP NOT NULL, "fundId" uuid, CONSTRAINT "PK_94a0a8348063f9794587ff50178" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "investment" ADD CONSTRAINT "FK_5ba755def7b1652c6033f309834" FOREIGN KEY ("investorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "investment" ADD CONSTRAINT "FK_3fa52fcb42f6afd7c5b8842dc6f" FOREIGN KEY ("fundId") REFERENCES "fund"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "investment" ADD CONSTRAINT "FK_3fd8bdffdac0594de6b64d0e3c3" FOREIGN KEY ("assetId") REFERENCES "asset"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_7d351cf52535ae43deb95dccd8d" FOREIGN KEY ("investorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_fe04fb0506d1a717aac81cf3821" FOREIGN KEY ("fundId") REFERENCES "fund"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_5a4563ae1b6c03c140e5ec17a6b" FOREIGN KEY ("assetId") REFERENCES "asset"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "portfolio" ADD CONSTRAINT "FK_93c92663890c4c05ed26508d670" FOREIGN KEY ("investorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "portfolio" ADD CONSTRAINT "FK_25cdfccee7d0ee3b61813d75b9f" FOREIGN KEY ("fundId") REFERENCES "fund"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "holdings" ADD CONSTRAINT "FK_1545481b5069ce2347c17d2c96b" FOREIGN KEY ("investorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "holdings" ADD CONSTRAINT "FK_c58d3a3d7294cae3582822eb30d" FOREIGN KEY ("fundId") REFERENCES "fund"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "holdings" ADD CONSTRAINT "FK_d19f7fac5b6570a98a48adffbca" FOREIGN KEY ("assetId") REFERENCES "asset"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "current_asset_values" ADD CONSTRAINT "FK_2a2a22e760f772bf1b18a283a9c" FOREIGN KEY ("assetId") REFERENCES "asset"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "historical_data" ADD CONSTRAINT "FK_27731fd572e2c967f7b5e229706" FOREIGN KEY ("assetId") REFERENCES "asset"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fund_value_nav" ADD CONSTRAINT "FK_02e362d76364ee9eaec172cf88f" FOREIGN KEY ("fundId") REFERENCES "fund"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fund_value_nav" DROP CONSTRAINT "FK_02e362d76364ee9eaec172cf88f"`);
        await queryRunner.query(`ALTER TABLE "historical_data" DROP CONSTRAINT "FK_27731fd572e2c967f7b5e229706"`);
        await queryRunner.query(`ALTER TABLE "current_asset_values" DROP CONSTRAINT "FK_2a2a22e760f772bf1b18a283a9c"`);
        await queryRunner.query(`ALTER TABLE "holdings" DROP CONSTRAINT "FK_d19f7fac5b6570a98a48adffbca"`);
        await queryRunner.query(`ALTER TABLE "holdings" DROP CONSTRAINT "FK_c58d3a3d7294cae3582822eb30d"`);
        await queryRunner.query(`ALTER TABLE "holdings" DROP CONSTRAINT "FK_1545481b5069ce2347c17d2c96b"`);
        await queryRunner.query(`ALTER TABLE "portfolio" DROP CONSTRAINT "FK_25cdfccee7d0ee3b61813d75b9f"`);
        await queryRunner.query(`ALTER TABLE "portfolio" DROP CONSTRAINT "FK_93c92663890c4c05ed26508d670"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_5a4563ae1b6c03c140e5ec17a6b"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_fe04fb0506d1a717aac81cf3821"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_7d351cf52535ae43deb95dccd8d"`);
        await queryRunner.query(`ALTER TABLE "investment" DROP CONSTRAINT "FK_3fd8bdffdac0594de6b64d0e3c3"`);
        await queryRunner.query(`ALTER TABLE "investment" DROP CONSTRAINT "FK_3fa52fcb42f6afd7c5b8842dc6f"`);
        await queryRunner.query(`ALTER TABLE "investment" DROP CONSTRAINT "FK_5ba755def7b1652c6033f309834"`);
        await queryRunner.query(`DROP TABLE "fund_value_nav"`);
        await queryRunner.query(`DROP TABLE "historical_data"`);
        await queryRunner.query(`DROP TABLE "current_asset_values"`);
        await queryRunner.query(`DROP TABLE "holdings"`);
        await queryRunner.query(`DROP TABLE "portfolio"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`DROP TABLE "investment"`);
    }

}
