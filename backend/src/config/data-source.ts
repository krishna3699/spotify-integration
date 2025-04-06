import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { TrackAdvice } from '../entities/TrackAdvice';
import { User } from '../entities/User';
import { config } from './env';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: config.DB.HOST,
    port: config.DB.PORT,
    username: config.DB.USERNAME,
    password: config.DB.PASSWORD,
    database: config.DB.DATABASE,
    synchronize: config.NODE_ENV === 'development', // Automatically create tables in development
    logging: false,
    // logging: config.NODE_ENV === 'development',
    entities: [TrackAdvice, User],
    migrations: ['src/migrations/*.ts'],
    subscribers: [],
});
