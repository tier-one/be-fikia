import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewColumnsToTransactions1701079252155 implements MigrationInterface {
    name = 'AddNewColumnsToTransactions1701079252155'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fund_transaction" ALTER COLUMN "createdAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "fund_transaction" ALTER COLUMN "updatedAt" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fund_transaction" ALTER COLUMN "updatedAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "fund_transaction" ALTER COLUMN "createdAt" DROP NOT NULL`);
    }

}
