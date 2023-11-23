import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFundIdAndInvestorFullnamesToTransaction1700723778889 implements MigrationInterface {
    name = 'AddFundIdAndInvestorFullnamesToTransaction1700723778889'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fund_transaction" DROP CONSTRAINT "FK_bc66b6dcbbd2cf5796fecba1d8d"`);
        await queryRunner.query(`ALTER TABLE "fund_transaction" DROP COLUMN "assetId"`);
        await queryRunner.query(`ALTER TABLE "fund_transaction" ADD "investorFullNames" character varying`);
        await queryRunner.query(`ALTER TABLE "fund_transaction" ADD "fundId" uuid`);
        await queryRunner.query(`ALTER TABLE "fund_transaction" ADD CONSTRAINT "FK_0a0867479db177258921f6f3257" FOREIGN KEY ("fundId") REFERENCES "fund"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fund_transaction" DROP CONSTRAINT "FK_0a0867479db177258921f6f3257"`);
        await queryRunner.query(`ALTER TABLE "fund_transaction" DROP COLUMN "fundId"`);
        await queryRunner.query(`ALTER TABLE "fund_transaction" DROP COLUMN "investorFullNames"`);
        await queryRunner.query(`ALTER TABLE "fund_transaction" ADD "assetId" uuid`);
        await queryRunner.query(`ALTER TABLE "fund_transaction" ADD CONSTRAINT "FK_bc66b6dcbbd2cf5796fecba1d8d" FOREIGN KEY ("assetId") REFERENCES "asset"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
