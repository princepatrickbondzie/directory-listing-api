import { MigrationInterface, QueryRunner } from "typeorm";

export class User1674906711962 implements MigrationInterface {
    name = 'User1674906711962'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "e_users" ("id" SERIAL NOT NULL, "firstname" character varying NOT NULL, "lastname" character varying NOT NULL, "email" character varying NOT NULL, "contact" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'user', "active" boolean NOT NULL DEFAULT true, "emailactivated" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_d61f8cef87a402e1f382f561d29" UNIQUE ("email"), CONSTRAINT "UQ_32693a5157d5c50bcf85d6e03e4" UNIQUE ("contact"), CONSTRAINT "PK_9f00aee408a4747f577a41cf505" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "e_users"`);
    }

}
