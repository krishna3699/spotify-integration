import { AppDataSource } from './data-source';

export const connectDB = async (): Promise<void> => {
    try {
        await AppDataSource.initialize();
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};
