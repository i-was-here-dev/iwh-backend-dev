import { Provider } from "@nestjs/common";
import { DatabaseDiTokens } from "../di/database-tokens.di";
import { DataSource } from "typeorm";

export const databaseProviders: Array<Provider> = [
    {
        provide: DatabaseDiTokens.PostgresDataSource,
        useFactory: () => {
            const dataSource: DataSource = new DataSource({
                type: 'postgres',
                host: process.env.POSTGRES_HOST,
                port: parseInt(process.env.POSTGRES_PORT),
                username: process.env.POSTGRES_USERNAME,
                password: process.env.POSTGRES_PASSWORD,
                database: process.env.POSTGRES_DB_NAME,
                entities: [],
                synchronize: true,
                logging: process.env.NODE_ENV === 'development',
            });

            return dataSource.initialize();
        },
    },
];
