import { TypeOrmModule } from "@nestjs/typeorm";

export const orm_config : TypeOrmModule = {
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "",
    "database": "test",
    "entities": ["dist/**/*.entity{.ts,.js}"],
    "synchronize": true
}