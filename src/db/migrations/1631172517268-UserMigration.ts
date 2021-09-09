import {MigrationInterface, QueryRunner} from "typeorm";

export class UserMigration1631172517268 implements MigrationInterface {
    name = 'UserMigration1631172517268'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`glints\`.\`user\` CHANGE \`token\` \`token\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`glints\`.\`user\` CHANGE \`token\` \`token\` varchar(255) NULL DEFAULT 'NULL'`);
    }

}
