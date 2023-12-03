import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNVAPerClintColumnToSubscriptionTable1701600924248 implements MigrationInterface {
    name = 'AddNVAPerClintColumnToSubscriptionTable1701600924248'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscription" ADD "navPerClient" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscription" DROP COLUMN "navPerClient"`);
    }

}
