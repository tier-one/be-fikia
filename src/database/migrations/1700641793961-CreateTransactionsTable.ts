import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTransactionsTable1700641793961 implements MigrationInterface {
    name = 'CreateTransactionsTable1700641793961'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."fund_transaction_transactiontype_enum" AS ENUM('buy', 'sell', 'transfer', 'dividend', 'interest', 'redemption', 'contribution', 'distribution', 'exchange', 'other')`);
        await queryRunner.query(`CREATE TYPE "public"."fund_transaction_status_enum" AS ENUM('pending', 'completed', 'cancelled', 'failed')`);
        await queryRunner.query(`CREATE TABLE "fund_transaction" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "transactionType" "public"."fund_transaction_transactiontype_enum" NOT NULL DEFAULT 'other', "amount" numeric(10,2) NOT NULL, "price" numeric(10,2) NOT NULL, "status" "public"."fund_transaction_status_enum" NOT NULL DEFAULT 'pending', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "note" text, "assetId" uuid, "userId" uuid, CONSTRAINT "PK_f0c51be8fe4cd8babf5885b0240" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "fund_transaction" ADD CONSTRAINT "FK_bc66b6dcbbd2cf5796fecba1d8d" FOREIGN KEY ("assetId") REFERENCES "asset"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fund_transaction" ADD CONSTRAINT "FK_5296736ddcd46f59043c85b2f22" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fund_transaction" DROP CONSTRAINT "FK_5296736ddcd46f59043c85b2f22"`);
        await queryRunner.query(`ALTER TABLE "fund_transaction" DROP CONSTRAINT "FK_bc66b6dcbbd2cf5796fecba1d8d"`);
        await queryRunner.query(`DROP TABLE "fund_transaction"`);
        await queryRunner.query(`DROP TYPE "public"."fund_transaction_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."fund_transaction_transactiontype_enum"`);
    }

}
