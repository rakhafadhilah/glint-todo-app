"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMigration1630726764960 = void 0;
class UserMigration1630726764960 {
    constructor() {
        this.name = 'UserMigration1630726764960';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`glints\`.\`user\` ADD \`username\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`glints\`.\`user\` CHANGE \`token\` \`token\` varchar(255) NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`glints\`.\`user\` CHANGE \`token\` \`token\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`glints\`.\`user\` DROP COLUMN \`username\``);
    }
}
exports.UserMigration1630726764960 = UserMigration1630726764960;
//# sourceMappingURL=1630726764960-UserMigration.js.map