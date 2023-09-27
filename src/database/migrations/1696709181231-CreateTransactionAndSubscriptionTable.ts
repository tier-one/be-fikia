import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTransactionAndSubscriptionTable1696709181231
  implements MigrationInterface
{
  name = 'CreateTransactionAndSubscriptionTable1696709181231';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "subscription" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "investorId" uuid, "fundId" uuid, CONSTRAINT "PK_8c3e00ebd02103caa1174cd5d9d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."transaction_table_type_enum" AS ENUM('buy', 'sell', 'subscription', 'redemption')`,
    );
    await queryRunner.query(
      `CREATE TABLE "transaction_table" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "public"."transaction_table_type_enum" NOT NULL, "quantity" numeric NOT NULL, "price" numeric(10,2) NOT NULL, "notes" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "managerId" uuid, "assetId" uuid, CONSTRAINT "PK_7a9e54dcf4f62070835f93a990b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" ADD CONSTRAINT "FK_079aa20564552120eb6a77309d6" FOREIGN KEY ("investorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" ADD CONSTRAINT "FK_aeb552c6221545de60c881b4b8f" FOREIGN KEY ("fundId") REFERENCES "fund"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_table" ADD CONSTRAINT "FK_402ed8cb630c9bed38d26fbfe39" FOREIGN KEY ("managerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_table" ADD CONSTRAINT "FK_672d8b0dffe269236740fc40888" FOREIGN KEY ("assetId") REFERENCES "asset_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transaction_table" DROP CONSTRAINT "FK_672d8b0dffe269236740fc40888"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_table" DROP CONSTRAINT "FK_402ed8cb630c9bed38d26fbfe39"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" DROP CONSTRAINT "FK_aeb552c6221545de60c881b4b8f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" DROP CONSTRAINT "FK_079aa20564552120eb6a77309d6"`,
    );
    await queryRunner.query(`DROP TABLE "transaction_table"`);
    await queryRunner.query(`DROP TYPE "public"."transaction_table_type_enum"`);
    await queryRunner.query(`DROP TABLE "subscription"`);
  }
}
