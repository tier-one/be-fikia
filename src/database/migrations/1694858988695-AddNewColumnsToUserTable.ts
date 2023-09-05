import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNewColumnsToUserTable1694858988695
  implements MigrationInterface
{
  name = 'AddNewColumnsToUserTable1694858988695';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "phoneNumber" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "governmentId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "governmentIdImage" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "firstApplicantSignatureImage" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "nextOfKeenImage" character varying`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f2578043e491921209f5dadd08" ON "user" ("phoneNumber") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fc629ca5e6e00e64a8b484379f" ON "user" ("governmentId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_58e4ff05c3791fe96045d0447e" ON "user" ("governmentIdImage") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_32671c6faf7e4b467e48fce4c5" ON "user" ("firstApplicantSignatureImage") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_97b9885dc229323f546f1a3b8a" ON "user" ("nextOfKeenImage") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_97b9885dc229323f546f1a3b8a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_32671c6faf7e4b467e48fce4c5"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_58e4ff05c3791fe96045d0447e"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fc629ca5e6e00e64a8b484379f"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f2578043e491921209f5dadd08"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "nextOfKeenImage"`);
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "firstApplicantSignatureImage"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "governmentIdImage"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "governmentId"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phoneNumber"`);
  }
}
