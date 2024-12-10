import express from 'express';
import { register, login, logout, profile } from '../controllers/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', profile);
router.post('/logout', logout);

export default router;
