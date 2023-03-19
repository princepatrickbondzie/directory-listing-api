import { MigrationInterface, QueryRunner } from "typeorm";

export class App1674906426838 implements MigrationInterface {
    name = 'App1674906426838'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "e_apps" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "apiKey" character varying NOT NULL, "active" boolean NOT NULL DEFAULT true, "supportMail" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_f01a6f859952668ba67650ab23c" UNIQUE ("name"), CONSTRAINT "UQ_ef6290a54a32c1d4b772717eca1" UNIQUE ("apiKey"), CONSTRAINT "PK_dc727594ec54a85dc847d556af0" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "e_apps"`);
    }

}
