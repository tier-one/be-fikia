import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatingFundSubscriptionTable1704788337298
  implements MigrationInterface
{
  name = 'UpdatingFundSubscriptionTable1704788337298';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subscription" ALTER COLUMN "numberOfShares" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subscription" ALTER COLUMN "numberOfShares" SET NOT NULL`,
    );
  }
}
