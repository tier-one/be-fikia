import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFundIdIntoAssetTable1696692066088
  implements MigrationInterface
{
  name = 'AddFundIdIntoAssetTable1696692066088';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "asset_table" ADD "fundId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset_table" ADD CONSTRAINT "FK_93c5be06cdfb8900e61fc03c27b" FOREIGN KEY ("fundId") REFERENCES "fund"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "asset_table" DROP CONSTRAINT "FK_93c5be06cdfb8900e61fc03c27b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`,
    );
    await queryRunner.query(`ALTER TABLE "asset_table" DROP COLUMN "fundId"`);
  }
}
