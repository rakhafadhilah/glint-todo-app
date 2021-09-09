import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

const config: MysqlConnectionOptions  = {
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
}

export default config;
