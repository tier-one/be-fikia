import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSubscriptionTable1699338778470
  implements MigrationInterface
{
  name = 'CreateSubscriptionTable1699338778470';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "subscription" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amountInvested" numeric(10,2) NOT NULL, "numberOfShares" numeric(10,2) NOT NULL, "subscriptionDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "investorId" uuid, "fundId" uuid, CONSTRAINT "PK_8c3e00ebd02103caa1174cd5d9d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" ADD CONSTRAINT "FK_079aa20564552120eb6a77309d6" FOREIGN KEY ("investorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" ADD CONSTRAINT "FK_aeb552c6221545de60c881b4b8f" FOREIGN KEY ("fundId") REFERENCES "fund"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subscription" DROP CONSTRAINT "FK_aeb552c6221545de60c881b4b8f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" DROP CONSTRAINT "FK_079aa20564552120eb6a77309d6"`,
    );
    await queryRunner.query(`DROP TABLE "subscription"`);
  }
}
