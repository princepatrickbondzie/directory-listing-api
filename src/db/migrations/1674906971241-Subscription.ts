import { MigrationInterface, QueryRunner } from "typeorm";

export class Subscription1674906971241 implements MigrationInterface {
    name = 'Subscription1674906971241'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "e_subscription" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" integer NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_c7ecab834181f990cba7e60f0f8" UNIQUE ("name"), CONSTRAINT "PK_a3532f390449a7cc1fc2c7d3110" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "e_subscription"`);
    }

}
