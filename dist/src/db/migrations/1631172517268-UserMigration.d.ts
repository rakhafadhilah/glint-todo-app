import { MigrationInterface, QueryRunner } from "typeorm";
export declare class UserMigration1631172517268 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
