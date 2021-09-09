import { MigrationInterface, QueryRunner } from "typeorm";
export declare class UserMigration1630726764960 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
