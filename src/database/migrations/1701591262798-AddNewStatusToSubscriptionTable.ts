import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNewStatusToSubscriptionTable1701591262798
  implements MigrationInterface
{
  name = 'AddNewStatusToSubscriptionTable1701591262798';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "subscription" DROP COLUMN "status"`);
    await queryRunner.query(
      `CREATE TYPE "public"."subscription_status_enum" AS ENUM('pending', 'approved', 'rejected', 'cancelled', 'expired', 'suspended', 'processing')`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" ADD "status" "public"."subscription_status_enum" NOT NULL DEFAULT 'pending'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "subscription" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."subscription_status_enum"`);
    await queryRunner.query(
      `ALTER TABLE "subscription" ADD "status" character varying NOT NULL DEFAULT 'pending'`,
    );
  }
}
