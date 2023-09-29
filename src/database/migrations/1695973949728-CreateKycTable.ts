import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateKycTable1695973949728 implements MigrationInterface {
  name = 'CreateKycTable1695973949728';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "KYCResult" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "jobId" character varying, "userId" character varying, "jobResult" character varying, "jobSuccess" boolean, "jobComplete" boolean, "timestamp" character varying, CONSTRAINT "PK_c25043316bf6f6371ce7714b1d2" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "KYCResult"`);
  }
}
