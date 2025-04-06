import cors from 'cors';
import express from 'express';
import { config } from './config/env';
import { errorHandler } from './middlewares/errorHandler';
import authRoutes from './routes/authRoutes';
import trackAdviceRoutes from './routes/trackAdviceRoutes';

const app = express();

app.use(
    cors({
        origin: config.CLIENT_URL,
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/user', trackAdviceRoutes);

app.use(errorHandler);

export default app;
