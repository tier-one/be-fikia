import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameInvestorIdToManagerId1699279562332
  implements MigrationInterface
{
  name = 'RenameInvestorIdToManagerId1699279562332';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "asset" DROP CONSTRAINT "FK_7a4be6c7e5fd8a3ecb3624bb786"`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" RENAME COLUMN "investorId" TO "managerId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ADD CONSTRAINT "FK_afce93d2bff27101fbb8bd0cc28" FOREIGN KEY ("managerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "asset" DROP CONSTRAINT "FK_afce93d2bff27101fbb8bd0cc28"`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" RENAME COLUMN "managerId" TO "investorId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset" ADD CONSTRAINT "FK_7a4be6c7e5fd8a3ecb3624bb786" FOREIGN KEY ("investorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
