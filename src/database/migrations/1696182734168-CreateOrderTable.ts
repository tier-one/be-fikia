import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOrderTable1696182734168 implements MigrationInterface {
  name = 'CreateOrderTable1696182734168';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."order_ordertype_enum" AS ENUM('buy', 'sell')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."order_orderstatus_enum" AS ENUM('pending', 'no paid', 'paid', 'complete')`,
    );
    await queryRunner.query(
      `CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "orderType" "public"."order_ordertype_enum" NOT NULL, "orderStatus" "public"."order_orderstatus_enum" NOT NULL, "quantity" numeric NOT NULL, "price" numeric NOT NULL, "assetId" uuid, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_8b2e2e46cf8773a56a0fd512856" FOREIGN KEY ("assetId") REFERENCES "asset_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_8b2e2e46cf8773a56a0fd512856"`,
    );
    await queryRunner.query(`DROP TABLE "order"`);
    await queryRunner.query(`DROP TYPE "public"."order_orderstatus_enum"`);
    await queryRunner.query(`DROP TYPE "public"."order_ordertype_enum"`);
  }
}
