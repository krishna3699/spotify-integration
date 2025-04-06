import dotenv from 'dotenv';

dotenv.config();

export const config = {
    PORT: parseInt(process.env.PORT || '3000', 10),
    NODE_ENV: process.env.NODE_ENV || 'development',
    DB: {
        HOST: process.env.DB_HOST,
        PORT: parseInt(process.env.DB_PORT || '3306', 10),
        USERNAME: process.env.DB_USERNAME || 'root',
        PASSWORD: process.env.DB_PASSWORD || 'password',
        DATABASE: process.env.DB_DATABASE || 'spotify_track_advice',
    },
    JWT_SECRET: process.env.JWT_SECRET || 'randomstring',
    SPOTIFY: {
        CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
        CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
        REDIRECT_URI:
            process.env.SPOTIFY_REDIRECT_URI ||
            'http://localhost:3000/api/auth/spotify/callback',
    },
    CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:4200',
};
