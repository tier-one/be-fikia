import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFundTable1695974121423 implements MigrationInterface {
  name = 'CreateFundTable1695974121423';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "fund" ("id" SERIAL NOT NULL, "fundName" character varying NOT NULL, "fundType" character varying NOT NULL, "custodian" character varying NOT NULL, "accountNumber" character varying NOT NULL, "fundStrategy" character varying NOT NULL, "investmentMinimum" numeric(10,2) NOT NULL, "managementFee" numeric(5,2) NOT NULL, "managerId" uuid, CONSTRAINT "UQ_62a7e395465e895d7e939b02e2c" UNIQUE ("fundName"), CONSTRAINT "PK_b3ac6e413e6e449bb499db1ccbc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "fund" ADD CONSTRAINT "FK_9ddcb769316ab95468542f49418" FOREIGN KEY ("managerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "fund" DROP CONSTRAINT "FK_9ddcb769316ab95468542f49418"`,
    );
    await queryRunner.query(`DROP TABLE "fund"`);
  }
}
