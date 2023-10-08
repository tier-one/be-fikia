import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFundAssetOrderTables1696752459618
  implements MigrationInterface
{
  name = 'CreateFundAssetOrderTables1696752459618';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "fund" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fundName" character varying NOT NULL, "fundType" character varying NOT NULL, "custodian" character varying NOT NULL, "accountNumber" character varying NOT NULL, "fundStrategy" character varying NOT NULL, "investmentMinimum" numeric(10,2) NOT NULL, "managementFee" numeric(5,2) NOT NULL, "fundLiabilities" numeric(10,2) NOT NULL DEFAULT '0', "sharesOutstanding" numeric(10,2) NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "managerId" uuid, "investorId" uuid, CONSTRAINT "UQ_62a7e395465e895d7e939b02e2c" UNIQUE ("fundName"), CONSTRAINT "PK_b3ac6e413e6e449bb499db1ccbc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "fund_setup" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "AccoutDepositoryBankName" character varying NOT NULL, "AccountDepositoryAccountNumber" character varying NOT NULL, "CashAccountBankName" character varying NOT NULL, "CashAccountNumber" character varying NOT NULL, "CustodianBankName" character varying NOT NULL, "CustodianParcentage" integer NOT NULL, "TrustBankName" character varying NOT NULL, "TrustPercentage" integer NOT NULL, "fundName" character varying NOT NULL, "FundGoal" character varying NOT NULL, "FundSymbol" character varying NOT NULL, "fundType" character varying NOT NULL, "fundLogo" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "managerId" uuid, "investorId" uuid, CONSTRAINT "PK_a1fa28e705b46be1bebd297a051" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "fund_value" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" numeric(10,2) NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "fundId" uuid, CONSTRAINT "PK_aead419629d97b7f52ac9c44355" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "asset_table" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "price" numeric(10,2) NOT NULL, "value" numeric(10,2) NOT NULL DEFAULT '0', "note" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "managerId" uuid, "fundId" uuid, CONSTRAINT "PK_f2abb8ff3b822f1dad2b7911d0e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."order_ordertype_enum" AS ENUM('buy', 'sell')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."order_orderstatus_enum" AS ENUM('pending', 'no paid', 'paid', 'complete')`,
    );
    await queryRunner.query(
      `CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "orderType" "public"."order_ordertype_enum" NOT NULL, "orderStatus" "public"."order_orderstatus_enum" NOT NULL, "quantity" numeric(10,2) NOT NULL, "price" numeric(10,2) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "assetId" uuid, "investorId" uuid, "fundId" uuid, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "balance" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "investmentMinimum" numeric(10,2) NOT NULL, "fundBalance" numeric(10,2) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "investorId" uuid, "managerId" uuid, "fundId" uuid, CONSTRAINT "PK_079dddd31a81672e8143a649ca0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."transaction_table_type_enum" AS ENUM('buy', 'sell', 'subscription', 'redemption')`,
    );
    await queryRunner.query(
      `CREATE TABLE "transaction_table" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "public"."transaction_table_type_enum" NOT NULL, "quantity" numeric NOT NULL, "price" numeric(10,2) NOT NULL, "notes" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "managerId" uuid, "assetId" uuid, CONSTRAINT "PK_7a9e54dcf4f62070835f93a990b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "subscription" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "investorId" uuid, "fundId" uuid, CONSTRAINT "PK_8c3e00ebd02103caa1174cd5d9d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund" ADD CONSTRAINT "FK_9ddcb769316ab95468542f49418" FOREIGN KEY ("managerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund" ADD CONSTRAINT "FK_43a92c0b10f2c44138dd1c9e9cd" FOREIGN KEY ("investorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund_setup" ADD CONSTRAINT "FK_9ce4b7666d50a0549f4c705a041" FOREIGN KEY ("managerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund_setup" ADD CONSTRAINT "FK_0723b52277240baa5214d0b4579" FOREIGN KEY ("investorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund_value" ADD CONSTRAINT "FK_8cc62a1ae8680cb8318af540120" FOREIGN KEY ("fundId") REFERENCES "fund"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset_table" ADD CONSTRAINT "FK_c6e9e1dfa7c3258e1228dd9176d" FOREIGN KEY ("managerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset_table" ADD CONSTRAINT "FK_93c5be06cdfb8900e61fc03c27b" FOREIGN KEY ("fundId") REFERENCES "fund"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_8b2e2e46cf8773a56a0fd512856" FOREIGN KEY ("assetId") REFERENCES "asset_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_c644a6a7c284754c4210706ed8a" FOREIGN KEY ("investorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_f95ad68f8ff01a2aa464a3038f2" FOREIGN KEY ("fundId") REFERENCES "fund"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "balance" ADD CONSTRAINT "FK_e9c55e7c9933e4adfa5dd12afb9" FOREIGN KEY ("investorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "balance" ADD CONSTRAINT "FK_89848e87d6f2512302aa3fd997d" FOREIGN KEY ("managerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "balance" ADD CONSTRAINT "FK_2d27ca17346424a5896a316d23b" FOREIGN KEY ("fundId") REFERENCES "fund"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_table" ADD CONSTRAINT "FK_402ed8cb630c9bed38d26fbfe39" FOREIGN KEY ("managerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_table" ADD CONSTRAINT "FK_672d8b0dffe269236740fc40888" FOREIGN KEY ("assetId") REFERENCES "asset_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" ADD CONSTRAINT "FK_079aa20564552120eb6a77309d6" FOREIGN KEY ("investorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" ADD CONSTRAINT "FK_aeb552c6221545de60c881b4b8f" FOREIGN KEY ("fundId") REFERENCES "fund"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subscription" DROP CONSTRAINT "FK_aeb552c6221545de60c881b4b8f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" DROP CONSTRAINT "FK_079aa20564552120eb6a77309d6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_table" DROP CONSTRAINT "FK_672d8b0dffe269236740fc40888"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_table" DROP CONSTRAINT "FK_402ed8cb630c9bed38d26fbfe39"`,
    );
    await queryRunner.query(
      `ALTER TABLE "balance" DROP CONSTRAINT "FK_2d27ca17346424a5896a316d23b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "balance" DROP CONSTRAINT "FK_89848e87d6f2512302aa3fd997d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "balance" DROP CONSTRAINT "FK_e9c55e7c9933e4adfa5dd12afb9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_f95ad68f8ff01a2aa464a3038f2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_c644a6a7c284754c4210706ed8a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_8b2e2e46cf8773a56a0fd512856"`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset_table" DROP CONSTRAINT "FK_93c5be06cdfb8900e61fc03c27b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset_table" DROP CONSTRAINT "FK_c6e9e1dfa7c3258e1228dd9176d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund_value" DROP CONSTRAINT "FK_8cc62a1ae8680cb8318af540120"`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund_setup" DROP CONSTRAINT "FK_0723b52277240baa5214d0b4579"`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund_setup" DROP CONSTRAINT "FK_9ce4b7666d50a0549f4c705a041"`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund" DROP CONSTRAINT "FK_43a92c0b10f2c44138dd1c9e9cd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund" DROP CONSTRAINT "FK_9ddcb769316ab95468542f49418"`,
    );
    await queryRunner.query(`DROP TABLE "subscription"`);
    await queryRunner.query(`DROP TABLE "transaction_table"`);
    await queryRunner.query(`DROP TYPE "public"."transaction_table_type_enum"`);
    await queryRunner.query(`DROP TABLE "balance"`);
    await queryRunner.query(`DROP TABLE "order"`);
    await queryRunner.query(`DROP TYPE "public"."order_orderstatus_enum"`);
    await queryRunner.query(`DROP TYPE "public"."order_ordertype_enum"`);
    await queryRunner.query(`DROP TABLE "asset_table"`);
    await queryRunner.query(`DROP TABLE "fund_value"`);
    await queryRunner.query(`DROP TABLE "fund_setup"`);
    await queryRunner.query(`DROP TABLE "fund"`);
  }
}
