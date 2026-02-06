import { MigrationInterface, QueryRunner } from 'typeorm';

export class SegundaMigracion1770170742880 implements MigrationInterface {
  name = 'SegundaMigracion1770170742880';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "title" TYPE character varying(100)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "title" TYPE character varying(255)`);
  }
}
