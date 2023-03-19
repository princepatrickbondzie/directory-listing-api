import { MigrationInterface, QueryRunner } from "typeorm";

export class Category1674953965199 implements MigrationInterface {
    name = 'Category1674953965199'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "e_categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "active" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_dc35dd655e4aa981eb030595612" UNIQUE ("name"), CONSTRAINT "PK_6ceed3cb58efc11e990910d5e72" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "e_categories"`);
    }

}
