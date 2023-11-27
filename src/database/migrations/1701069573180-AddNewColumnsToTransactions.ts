import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewColumnsToTransactions1701069573180 implements MigrationInterface {
    name = 'AddNewColumnsToTransactions1701069573180'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fund_transaction" ADD "tradeDate" date`);
        await queryRunner.query(`ALTER TABLE "fund_transaction" ADD "broker" character varying`);
        await queryRunner.query(`ALTER TABLE "fund_transaction" ADD "typeOfTransaction" character varying`);
        await queryRunner.query(`ALTER TABLE "fund_transaction" ADD "typeOfInstrument" character varying`);
        await queryRunner.query(`ALTER TABLE "fund_transaction" ADD "instrument" character varying`);
        await queryRunner.query(`ALTER TABLE "fund_transaction" ADD "numberOfShares" numeric(10,2)`);
        await queryRunner.query(`ALTER TABLE "fund_transaction" ADD "commission" numeric(10,2)`);
        await queryRunner.query(`ALTER TABLE "fund_transaction" ALTER COLUMN "transactionType" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "fund_transaction" ALTER COLUMN "amount" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "fund_transaction" ALTER COLUMN "price" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "fund_transaction" ALTER COLUMN "status" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fund_transaction" ALTER COLUMN "status" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "fund_transaction" ALTER COLUMN "price" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "fund_transaction" ALTER COLUMN "amount" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "fund_transaction" ALTER COLUMN "transactionType" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "fund_transaction" DROP COLUMN "commission"`);
        await queryRunner.query(`ALTER TABLE "fund_transaction" DROP COLUMN "numberOfShares"`);
        await queryRunner.query(`ALTER TABLE "fund_transaction" DROP COLUMN "instrument"`);
        await queryRunner.query(`ALTER TABLE "fund_transaction" DROP COLUMN "typeOfInstrument"`);
        await queryRunner.query(`ALTER TABLE "fund_transaction" DROP COLUMN "typeOfTransaction"`);
        await queryRunner.query(`ALTER TABLE "fund_transaction" DROP COLUMN "broker"`);
        await queryRunner.query(`ALTER TABLE "fund_transaction" DROP COLUMN "tradeDate"`);
    }

}
