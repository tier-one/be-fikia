import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAssetTable1695974210963 implements MigrationInterface {
  name = 'CreateAssetTable1695974210963';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "asset_table" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "price" numeric NOT NULL, "note" text, "managerId" uuid, "userId" uuid, CONSTRAINT "PK_f2abb8ff3b822f1dad2b7911d0e" PRIMARY KEY ("id"))`,
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
    await queryRunner.query(`DROP TABLE "asset_table"`);
  }
}
