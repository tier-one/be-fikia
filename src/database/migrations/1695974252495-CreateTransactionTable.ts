import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTransactionTable1695974252495 implements MigrationInterface {
  name = 'CreateTransactionTable1695974252495';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."transaction_table_type_enum" AS ENUM('buy', 'sell', 'subscription', 'redemption')`,
    );
    await queryRunner.query(
      `CREATE TABLE "transaction_table" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "public"."transaction_table_type_enum" NOT NULL, "quantity" numeric NOT NULL, "price" numeric NOT NULL, "notes" text, "managerId" uuid, "userId" uuid, "assetId" uuid, CONSTRAINT "PK_7a9e54dcf4f62070835f93a990b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_table" ADD CONSTRAINT "FK_402ed8cb630c9bed38d26fbfe39" FOREIGN KEY ("managerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_table" ADD CONSTRAINT "FK_62e28bf7be0a819b1c021d3c520" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE "transaction_table" DROP CONSTRAINT "FK_62e28bf7be0a819b1c021d3c520"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_table" DROP CONSTRAINT "FK_402ed8cb630c9bed38d26fbfe39"`,
    );
    await queryRunner.query(`DROP TABLE "transaction_table"`);
    await queryRunner.query(`DROP TYPE "public"."transaction_table_type_enum"`);
  }
}
