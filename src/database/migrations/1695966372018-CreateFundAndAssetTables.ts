import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFundAndAssetTables1695966372018
  implements MigrationInterface
{
  name = 'CreateFundAndAssetTables1695966372018';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "fund" ("id" SERIAL NOT NULL, "fundName" character varying NOT NULL, "fundType" character varying NOT NULL, "custodian" character varying NOT NULL, "accountNumber" character varying NOT NULL, "fundStrategy" character varying NOT NULL, "investmentMinimum" numeric(10,2) NOT NULL, "managementFee" numeric(5,2) NOT NULL, "managerId" uuid, CONSTRAINT "UQ_62a7e395465e895d7e939b02e2c" UNIQUE ("fundName"), CONSTRAINT "PK_b3ac6e413e6e449bb499db1ccbc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "asset_table" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "price" numeric NOT NULL, "note" text, "managerId" uuid, "userId" uuid, CONSTRAINT "PK_f2abb8ff3b822f1dad2b7911d0e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund" ADD CONSTRAINT "FK_9ddcb769316ab95468542f49418" FOREIGN KEY ("managerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset_table" ADD CONSTRAINT "FK_c6e9e1dfa7c3258e1228dd9176d" FOREIGN KEY ("managerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset_table" ADD CONSTRAINT "FK_4d8ec92c5bec0d46c094e3c3263" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "asset_table" DROP CONSTRAINT "FK_4d8ec92c5bec0d46c094e3c3263"`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset_table" DROP CONSTRAINT "FK_c6e9e1dfa7c3258e1228dd9176d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund" DROP CONSTRAINT "FK_9ddcb769316ab95468542f49418"`,
    );
    await queryRunner.query(`DROP TABLE "asset_table"`);
    await queryRunner.query(`DROP TABLE "fund"`);
  }
}
