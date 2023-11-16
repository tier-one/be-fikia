import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCurrencyColumnsIntoAssetTable1700114747306
  implements MigrationInterface
{
  name = 'AddCurrencyColumnsIntoAssetTable1700114747306';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "asset" ADD "fixedIncomeDetailsCurrency" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "asset" DROP COLUMN "fixedIncomeDetailsCurrency"`,
    );
  }
}
