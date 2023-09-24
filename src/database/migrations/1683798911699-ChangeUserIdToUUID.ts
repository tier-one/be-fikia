import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeUserIdToUUID1683798911699 implements MigrationInterface {
  name = 'ChangeUserIdToUUID1683798911699';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "role" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "bank_details" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "branchName" character varying, "accountNumber" character varying, "swiftCode" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_ddbbcb9586b7f4d6124fe58f257" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2fbe285b73cf9c1446980baac9" ON "bank_details" ("name") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_eda4a221d7f9f6df69cc28da79" ON "bank_details" ("branchName") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0b6269caa2175bb08478211f30" ON "bank_details" ("accountNumber") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_95c2d3dca7c3bc500a82b2a830" ON "bank_details" ("swiftCode") `,
    );
    await queryRunner.query(
      `CREATE TABLE "status" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying, "password" character varying, "provider" character varying NOT NULL DEFAULT 'email', "socialId" character varying, "firstName" character varying, "middleName" character varying, "lastName" character varying, "dateOfBirth" character varying, "residence" character varying, "occupation" character varying, "sourceOfFunds" character varying, "hash" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "bankDetailsId" uuid, "roleId" integer, "statusId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_2644575524a391f061529f0a22" UNIQUE ("bankDetailsId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9bd2fe7a8e694dedc4ec2f666f" ON "user" ("socialId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_58e4dbff0e1a32a9bdc861bb29" ON "user" ("firstName") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7141d4923470530a8208651a71" ON "user" ("middleName") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f0e1b4ecdca13b177e2e3a0613" ON "user" ("lastName") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9c88490dd820f4229c9bb07490" ON "user" ("dateOfBirth") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_193d8b18c3561c5c40ac6000c9" ON "user" ("residence") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4f56373aff206ca465f9d3c355" ON "user" ("occupation") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_72125579ff90d9898df09bd81b" ON "user" ("sourceOfFunds") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e282acb94d2e3aec10f480e4f6" ON "user" ("hash") `,
    );
    await queryRunner.query(
      `CREATE TABLE "wait_list" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying, CONSTRAINT "UQ_ec8b0bda206fe65a5cc848fe7b3" UNIQUE ("email"), CONSTRAINT "PK_263b33e683bd5465d873746786f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "forgot" ("id" SERIAL NOT NULL, "hash" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" uuid, CONSTRAINT "PK_087959f5bb89da4ce3d763eab75" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_df507d27b0fb20cd5f7bef9b9a" ON "forgot" ("hash") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_2644575524a391f061529f0a22d" FOREIGN KEY ("bankDetailsId") REFERENCES "bank_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_dc18daa696860586ba4667a9d31" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "forgot" ADD CONSTRAINT "FK_31f3c80de0525250f31e23a9b83" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "forgot" DROP CONSTRAINT "FK_31f3c80de0525250f31e23a9b83"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_dc18daa696860586ba4667a9d31"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_2644575524a391f061529f0a22d"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_df507d27b0fb20cd5f7bef9b9a"`,
    );
    await queryRunner.query(`DROP TABLE "forgot"`);
    await queryRunner.query(`DROP TABLE "wait_list"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e282acb94d2e3aec10f480e4f6"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_72125579ff90d9898df09bd81b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4f56373aff206ca465f9d3c355"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_193d8b18c3561c5c40ac6000c9"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9c88490dd820f4229c9bb07490"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f0e1b4ecdca13b177e2e3a0613"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7141d4923470530a8208651a71"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_58e4dbff0e1a32a9bdc861bb29"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9bd2fe7a8e694dedc4ec2f666f"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "status"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_95c2d3dca7c3bc500a82b2a830"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0b6269caa2175bb08478211f30"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_eda4a221d7f9f6df69cc28da79"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2fbe285b73cf9c1446980baac9"`,
    );
    await queryRunner.query(`DROP TABLE "bank_details"`);
    await queryRunner.query(`DROP TABLE "role"`);
  }
}
