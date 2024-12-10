import session from 'express-session';
import {config} from '../config.js';

export const sessionMiddleware = session({
    secret: config.SESSION_SECRET, // Pastikan secret diambil dari variabel lingkungan
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 60 * 1000 } // 30 menit
});
