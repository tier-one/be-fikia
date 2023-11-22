import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNewColumnsIntoAssetTable1700641308890
  implements MigrationInterface
{
  name = 'AddNewColumnsIntoAssetTable1700641308890';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "asset" ALTER COLUMN "fixedIncomeDetailsCouponrate" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ALTER COLUMN "fixedIncomeDetailsFacevalue" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ALTER COLUMN "fixedIncomeDetailsYieldtomaturity" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "asset" ALTER COLUMN "fixedIncomeDetailsYieldtomaturity" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ALTER COLUMN "fixedIncomeDetailsFacevalue" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ALTER COLUMN "fixedIncomeDetailsCouponrate" SET NOT NULL`,
    );
  }
}
