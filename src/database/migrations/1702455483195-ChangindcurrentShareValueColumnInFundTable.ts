import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangindcurrentShareValueColumnInFundTable1702455483195
  implements MigrationInterface
{
  name = 'ChangindcurrentShareValueColumnInFundTable1702455483195';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "fund" ALTER COLUMN "currentShareValue" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "fund" ALTER COLUMN "currentShareValue" SET NOT NULL`,
    );
  }
}
