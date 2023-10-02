import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateActivityTable1696657032739 implements MigrationInterface {
  name = 'CreateActivityTable1696657032739';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "activity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" character varying NOT NULL, "activityType" character varying NOT NULL, "loginAttempts" integer NOT NULL DEFAULT '0', "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_24625a1d6b1b089c8ae206fe467" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "activity"`);
  }
}
