import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCurrentShareValueColumnsToFundTable1701421636164 implements MigrationInterface {
    name = 'AddCurrentShareValueColumnsToFundTable1701421636164'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fund" ADD "currentShareValue" numeric(15,2) NOT NULL DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fund" DROP COLUMN "currentShareValue"`);
    }

}
