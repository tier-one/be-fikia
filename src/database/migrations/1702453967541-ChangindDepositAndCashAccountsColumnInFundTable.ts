import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangindDepositAndCashAccountsColumnInFundTable1702453967541
  implements MigrationInterface
{
  name = 'ChangindDepositAndCashAccountsColumnInFundTable1702453967541';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "fund" DROP COLUMN "AccoutDepositoryBankName"`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund" DROP COLUMN "AccountDepositoryAccountNumber"`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund" DROP COLUMN "CashAccountBankName"`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund" DROP COLUMN "CashAccountNumber"`,
    );
    await queryRunner.query(`ALTER TABLE "fund" ADD "DepositoryAccounts" json`);
    await queryRunner.query(`ALTER TABLE "fund" ADD "CashAccounts" json`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "fund" DROP COLUMN "CashAccounts"`);
    await queryRunner.query(
      `ALTER TABLE "fund" DROP COLUMN "DepositoryAccounts"`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund" ADD "CashAccountNumber" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund" ADD "CashAccountBankName" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund" ADD "AccountDepositoryAccountNumber" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund" ADD "AccoutDepositoryBankName" character varying NOT NULL`,
    );
  }
}
