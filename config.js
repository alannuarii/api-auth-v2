import dotenv from 'dotenv';

dotenv.config();

export const config = {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    SESSION_SECRET: process.env.SESSION_SECRET,
    PORT: process.env.PORT || 3000
};
