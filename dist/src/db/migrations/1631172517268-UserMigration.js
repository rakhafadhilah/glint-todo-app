"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMigration1631172517268 = void 0;
class UserMigration1631172517268 {
    constructor() {
        this.name = 'UserMigration1631172517268';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`glints\`.\`user\` CHANGE \`token\` \`token\` varchar(255) NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`glints\`.\`user\` CHANGE \`token\` \`token\` varchar(255) NULL DEFAULT 'NULL'`);
    }
}
exports.UserMigration1631172517268 = UserMigration1631172517268;
//# sourceMappingURL=1631172517268-UserMigration.js.map