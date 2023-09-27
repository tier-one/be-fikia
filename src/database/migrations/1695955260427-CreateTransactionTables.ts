import { MigrationInterface, QueryRunner } from 'typeorm';

<<<<<<<< HEAD:src/database/migrations/1695909832277-CreateTransactionAndAssetTable.ts
export class CreateTransactionAndAssetTable1695909832277
  implements MigrationInterface
{
  name = 'CreateTransactionAndAssetTable1695909832277';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "asset_table" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "price" numeric NOT NULL, "note" text, "managerId" uuid, "userId" uuid, CONSTRAINT "PK_f2abb8ff3b822f1dad2b7911d0e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "transaction_table" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "public"."transaction_table_type_enum" NOT NULL, "quantity" numeric NOT NULL, "price" numeric NOT NULL, "notes" text, "managerId" uuid, "userId" uuid, "assetId" uuid, CONSTRAINT "PK_7a9e54dcf4f62070835f93a990b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset_table" ADD CONSTRAINT "FK_c6e9e1dfa7c3258e1228dd9176d" FOREIGN KEY ("managerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset_table" ADD CONSTRAINT "FK_4d8ec92c5bec0d46c094e3c3263" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
========
export class CreateTransactionTables1695955260427
  implements MigrationInterface
{
  name = 'CreateTransactionTables1695955260427';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."transaction_table_type_enum" AS ENUM('buy', 'sell', 'subscription', 'redemption')`,
    );
    await queryRunner.query(
      `CREATE TABLE "transaction_table" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "public"."transaction_table_type_enum" NOT NULL, "quantity" numeric NOT NULL, "price" numeric NOT NULL, "notes" text, "managerId" uuid, "userId" uuid, "assetId" uuid, CONSTRAINT "PK_7a9e54dcf4f62070835f93a990b" PRIMARY KEY ("id"))`,
>>>>>>>> 999fd60 (Ft: Asset):src/database/migrations/1695955260427-CreateTransactionTables.ts
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
<<<<<<<< HEAD:src/database/migrations/1695909832277-CreateTransactionAndAssetTable.ts
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_table" DROP CONSTRAINT "FK_402ed8cb630c9bed38d26fbfe39"`,
========
>>>>>>>> 999fd60 (Ft: Asset):src/database/migrations/1695955260427-CreateTransactionTables.ts
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_table" DROP CONSTRAINT "FK_402ed8cb630c9bed38d26fbfe39"`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset_table" DROP CONSTRAINT "FK_c6e9e1dfa7c3258e1228dd9176d"`,
    );
    await queryRunner.query(`DROP TABLE "transaction_table"`);
<<<<<<<< HEAD:src/database/migrations/1695909832277-CreateTransactionAndAssetTable.ts
    await queryRunner.query(`DROP TABLE "asset_table"`);
========
    await queryRunner.query(`DROP TYPE "public"."transaction_table_type_enum"`);
>>>>>>>> 999fd60 (Ft: Asset):src/database/migrations/1695955260427-CreateTransactionTables.ts
  }
}
