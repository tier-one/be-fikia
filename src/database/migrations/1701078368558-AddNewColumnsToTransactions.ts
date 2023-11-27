import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNewColumnsToTransactions1701078368558
  implements MigrationInterface
{
  name = 'AddNewColumnsToTransactions1701078368558';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "fund_transaction" DROP COLUMN "amount"`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund_transaction" DROP COLUMN "note"`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund_transaction" DROP COLUMN "investorFullNames"`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund_transaction" DROP COLUMN "typeOfTransaction"`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund_transaction" ALTER COLUMN "transactionType" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund_transaction" ALTER COLUMN "status" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund_transaction" ALTER COLUMN "createdAt" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund_transaction" ALTER COLUMN "updatedAt" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "fund_transaction" ALTER COLUMN "updatedAt" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund_transaction" ALTER COLUMN "createdAt" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund_transaction" ALTER COLUMN "status" SET DEFAULT 'pending'`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund_transaction" ALTER COLUMN "transactionType" SET DEFAULT 'other'`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund_transaction" ADD "typeOfTransaction" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund_transaction" ADD "investorFullNames" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "fund_transaction" ADD "note" text`);
    await queryRunner.query(
      `ALTER TABLE "fund_transaction" ADD "amount" numeric(15,2)`,
    );
  }
}
