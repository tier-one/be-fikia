import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateActivityAndKycTables1696752429476
  implements MigrationInterface
{
  name = 'CreateActivityAndKycTables1696752429476';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "activity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" character varying NOT NULL, "activityType" character varying NOT NULL, "loginAttempts" integer NOT NULL DEFAULT '0', "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_24625a1d6b1b089c8ae206fe467" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "KYCResult" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "jobId" character varying, "userId" character varying, "jobResult" character varying, "jobSuccess" boolean, "jobComplete" boolean, "timestamp" character varying, CONSTRAINT "PK_c25043316bf6f6371ce7714b1d2" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "KYCResult"`);
    await queryRunner.query(`DROP TABLE "activity"`);
  }
}
