"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMigration1631015291341 = void 0;
class UserMigration1631015291341 {
    constructor() {
        this.name = 'UserMigration1631015291341';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`glints\`.\`user\` CHANGE \`role\` \`isAdmin\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`glints\`.\`user\` CHANGE \`token\` \`token\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`glints\`.\`user\` DROP COLUMN \`isAdmin\``);
        await queryRunner.query(`ALTER TABLE \`glints\`.\`user\` ADD \`isAdmin\` tinyint NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`glints\`.\`user\` DROP COLUMN \`isAdmin\``);
        await queryRunner.query(`ALTER TABLE \`glints\`.\`user\` ADD \`isAdmin\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`glints\`.\`user\` CHANGE \`token\` \`token\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`glints\`.\`user\` CHANGE \`isAdmin\` \`role\` int NOT NULL`);
    }
}
exports.UserMigration1631015291341 = UserMigration1631015291341;
//# sourceMappingURL=1631015291341-UserMigration.js.map