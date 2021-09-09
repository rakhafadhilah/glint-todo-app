import {MigrationInterface, QueryRunner} from "typeorm";

export class todomigration1631172694704 implements MigrationInterface {
    name = 'todomigration1631172694704'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`glints\`.\`todo\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` varchar(255) NOT NULL, \`title\` varchar(255) NOT NULL, \`desc\` varchar(255) NOT NULL, \`image\` varchar(255) NOT NULL, \`status\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`glints\`.\`user\` (\`id\` char(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`token\` varchar(255) NULL, \`isActive\` tinyint NOT NULL, \`isAdmin\` tinyint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`glints\`.\`user\``);
        await queryRunner.query(`DROP TABLE \`glints\`.\`todo\``);
    }

}
