import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFundSetupTable1696708900170 implements MigrationInterface {
  name = 'CreateFundSetupTable1696708900170';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "fund_setup" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "AccoutDepositoryBankName" character varying NOT NULL, "AccountDepositoryAccountNumber" character varying NOT NULL, "CashAccountBankName" character varying NOT NULL, "CashAccountNumber" character varying NOT NULL, "CustodianBankName" character varying NOT NULL, "CustodianParcentage" integer NOT NULL, "TrustBankName" character varying NOT NULL, "TrustPercentage" integer NOT NULL, "fundName" character varying NOT NULL, "FundGoal" character varying NOT NULL, "FundSymbol" character varying NOT NULL, "fundType" character varying NOT NULL, "fundLogo" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "managerId" uuid, "investorId" uuid, CONSTRAINT "PK_a1fa28e705b46be1bebd297a051" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund_setup" ADD CONSTRAINT "FK_9ce4b7666d50a0549f4c705a041" FOREIGN KEY ("managerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund_setup" ADD CONSTRAINT "FK_0723b52277240baa5214d0b4579" FOREIGN KEY ("investorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "fund_setup" DROP CONSTRAINT "FK_0723b52277240baa5214d0b4579"`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund_setup" DROP CONSTRAINT "FK_9ce4b7666d50a0549f4c705a041"`,
    );
    await queryRunner.query(`DROP TABLE "fund_setup"`);
  }
}
