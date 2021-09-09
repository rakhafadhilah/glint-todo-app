import {MigrationInterface, QueryRunner} from "typeorm";

export class UserMigration1631015291341 implements MigrationInterface {
    name = 'UserMigration1631015291341'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`glints\`.\`user\` CHANGE \`role\` \`isAdmin\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`glints\`.\`user\` CHANGE \`token\` \`token\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`glints\`.\`user\` DROP COLUMN \`isAdmin\``);
        await queryRunner.query(`ALTER TABLE \`glints\`.\`user\` ADD \`isAdmin\` tinyint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`glints\`.\`user\` DROP COLUMN \`isAdmin\``);
        await queryRunner.query(`ALTER TABLE \`glints\`.\`user\` ADD \`isAdmin\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`glints\`.\`user\` CHANGE \`token\` \`token\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`glints\`.\`user\` CHANGE \`isAdmin\` \`role\` int NOT NULL`);
    }

}
