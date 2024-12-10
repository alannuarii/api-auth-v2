import mysql from 'mysql2/promise';
import { config } from '../config.js';

const dbConfig = {
    host: config.DB_HOST, // Menggunakan variabel dari .env
    user: config.DB_USER, // Menggunakan variabel dari .env
    password: config.DB_PASSWORD, // Menggunakan variabel dari .env
    database: config.DB_NAME // Menggunakan variabel dari .env
};

export const getConnection = async () => {
    return await mysql.createConnection(dbConfig);
};
