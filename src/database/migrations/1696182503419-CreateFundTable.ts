import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFundTable1696182503419 implements MigrationInterface {
  name = 'CreateFundTable1696182503419';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "fund" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fundName" character varying NOT NULL, "fundType" character varying NOT NULL, "custodian" character varying NOT NULL, "accountNumber" character varying NOT NULL, "fundStrategy" character varying NOT NULL, "investmentMinimum" numeric(10,2) NOT NULL, "managementFee" numeric(5,2) NOT NULL, "managerId" uuid, "userId" uuid, CONSTRAINT "UQ_62a7e395465e895d7e939b02e2c" UNIQUE ("fundName"), CONSTRAINT "PK_b3ac6e413e6e449bb499db1ccbc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund" ADD CONSTRAINT "FK_9ddcb769316ab95468542f49418" FOREIGN KEY ("managerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund" ADD CONSTRAINT "FK_9822d7a98891fce300c43ecabc4" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "fund" DROP CONSTRAINT "FK_9822d7a98891fce300c43ecabc4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund" DROP CONSTRAINT "FK_9ddcb769316ab95468542f49418"`,
    );
    await queryRunner.query(`DROP TABLE "fund"`);
  }
}