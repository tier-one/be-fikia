import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBalanceTable1696709109341 implements MigrationInterface {
  name = 'CreateBalanceTable1696709109341';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "balance" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "investmentMinimum" numeric(10,2) NOT NULL, "fundBalance" numeric(10,2) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "investorId" uuid, "managerId" uuid, "fundId" uuid, CONSTRAINT "PK_079dddd31a81672e8143a649ca0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "balance" ADD CONSTRAINT "FK_e9c55e7c9933e4adfa5dd12afb9" FOREIGN KEY ("investorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "balance" ADD CONSTRAINT "FK_89848e87d6f2512302aa3fd997d" FOREIGN KEY ("managerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "balance" ADD CONSTRAINT "FK_2d27ca17346424a5896a316d23b" FOREIGN KEY ("fundId") REFERENCES "fund"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "balance" DROP CONSTRAINT "FK_2d27ca17346424a5896a316d23b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "balance" DROP CONSTRAINT "FK_89848e87d6f2512302aa3fd997d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "balance" DROP CONSTRAINT "FK_e9c55e7c9933e4adfa5dd12afb9"`,
    );
    await queryRunner.query(`DROP TABLE "balance"`);
  }
}
