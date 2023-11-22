import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewColumnsIntoAssetTable1700637993856 implements MigrationInterface {
    name = 'AddNewColumnsIntoAssetTable1700637993856'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "asset" ALTER COLUMN "equityDetailsTickersymbol" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "asset" ALTER COLUMN "equityDetailsCompanyname" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "asset" ALTER COLUMN "equityDetailsCurrency" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "asset" ALTER COLUMN "equityDetailsExchange" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "asset" ALTER COLUMN "equityDetailsExchange" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "asset" ALTER COLUMN "fixedIncomeDetailsFixedincometype" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "asset" ALTER COLUMN "fixedIncomeDetailsFixedincomename" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "asset" ALTER COLUMN "fixedIncomeDetailsIssuer" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "asset" ALTER COLUMN "fixedIncomeDetailsMaturitydate" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "asset" ALTER COLUMN "fixedIncomeDetailsMaturitydate" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "asset" ALTER COLUMN "fixedIncomeDetailsIssuer" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "asset" ALTER COLUMN "fixedIncomeDetailsFixedincomename" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "asset" ALTER COLUMN "fixedIncomeDetailsFixedincometype" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "asset" ALTER COLUMN "equityDetailsExchange" SET DEFAULT 'default_value'`);
        await queryRunner.query(`ALTER TABLE "asset" ALTER COLUMN "equityDetailsExchange" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "asset" ALTER COLUMN "equityDetailsCurrency" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "asset" ALTER COLUMN "equityDetailsCompanyname" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "asset" ALTER COLUMN "equityDetailsTickersymbol" SET NOT NULL`);
    }

}
