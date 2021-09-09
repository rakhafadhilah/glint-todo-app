"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "",
    "database": "glints",
    "entities": ["dist/**/*.entity{.ts,.js}"],
    "synchronize": false,
    "migrations": ["dist/src/db/migrations/*{.ts,.js}"],
    "cli": {
        "migrationsDir": 'src/db/migrations'
    }
};
exports.default = config;
//# sourceMappingURL=ormconfig.js.map