import {MigrationInterface, QueryRunner} from "typeorm";

export class UserMigration1630726764960 implements MigrationInterface {
    name = 'UserMigration1630726764960'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`glints\`.\`user\` ADD \`username\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`glints\`.\`user\` CHANGE \`token\` \`token\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`glints\`.\`user\` CHANGE \`token\` \`token\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`glints\`.\`user\` DROP COLUMN \`username\``);
    }

}
