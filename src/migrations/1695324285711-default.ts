import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1695324285711 implements MigrationInterface {
    name = 'Default1695324285711'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sku" ("id" character varying NOT NULL, "valor" money NOT NULL, CONSTRAINT "PK_ed102ac07c2cbc14c9a1438ecc2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cliente" ("id" integer NOT NULL, "nome" text NOT NULL, CONSTRAINT "PK_18990e8df6cf7fe71b9dc0f5f39" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pedido" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, "tipo" text NOT NULL, "cliente_id" integer, CONSTRAINT "PK_af8d8b3d07fae559c37f56b3f43" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "item" ("id" integer NOT NULL, "categoria" text NOT NULL, "sub_categoria" text NOT NULL, "quantidade" integer NOT NULL, "sku_id" character varying, "pedido_id" character varying, CONSTRAINT "REL_c407309e0d8d7f10f039ea32b1" UNIQUE ("sku_id"), CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pedido" ADD CONSTRAINT "FK_ab19fb380d17682f87649eded89" FOREIGN KEY ("cliente_id") REFERENCES "cliente"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "item" ADD CONSTRAINT "FK_c407309e0d8d7f10f039ea32b10" FOREIGN KEY ("sku_id") REFERENCES "sku"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "item" ADD CONSTRAINT "FK_87738b80eb58b6e6ffd234dd4af" FOREIGN KEY ("pedido_id") REFERENCES "pedido"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" DROP CONSTRAINT "FK_87738b80eb58b6e6ffd234dd4af"`);
        await queryRunner.query(`ALTER TABLE "item" DROP CONSTRAINT "FK_c407309e0d8d7f10f039ea32b10"`);
        await queryRunner.query(`ALTER TABLE "pedido" DROP CONSTRAINT "FK_ab19fb380d17682f87649eded89"`);
        await queryRunner.query(`DROP TABLE "item"`);
        await queryRunner.query(`DROP TABLE "pedido"`);
        await queryRunner.query(`DROP TABLE "cliente"`);
        await queryRunner.query(`DROP TABLE "sku"`);
    }

}
