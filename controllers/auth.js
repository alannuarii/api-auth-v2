import { getConnection } from '../db/connection.js';

export const register = async (req, res) => {
    const { nama, role, pin, expires } = req.body;
    const connection = await getConnection();
    try {
        await connection.execute('INSERT INTO users (nama, role, pin, expires) VALUES (?, ?, ?, ?)', [nama, role, pin, expires]);
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(500).send('Error registering user');
    } finally {
        await connection.end();
    }
};

export const login = async (req, res) => {
    const { pin } = req.body;
    const connection = await getConnection();
    try {
        const [rows] = await connection.execute('SELECT * FROM users WHERE pin = ?', [pin]);
        if (rows.length > 0) {
            const user = rows[0];
            const now = new Date();
            if (user.expires < now) {
                return res.status(403).send('Account has expired');
            }
            req.session.userId = user.id;
            const sessionId = req.session.id;
            const expires = new Date(Date.now() + 30 * 60 * 1000);
            await connection.execute('INSERT INTO sessions (session_id, user_id, expires) VALUES (?, ?, ?)', [sessionId, user.id, expires]);
            return res.status(200).send('Login successful');
        }
        res.status(401).send('Invalid PIN');
    } catch (error) {
        res.status(500).send('Error logging in');
    } finally {
        await connection.end();
    }
};

export const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Error logging out');
        }
        res.status(200).send('Logout successful');
    });
};

export const profile = async (req, res) => {
    if (req.session.userId) {
        const connection = await getConnection();
        try {
            const [rows] = await connection.execute('SELECT * FROM users WHERE id = ?', [req.session.userId]);
            if (rows.length > 0) {
                return res.status(200).json(rows[0]);
            }
            res.status(404).send('User not found');
        } catch (error) {
            res.status(500).send('Error fetching user profile');
        } finally {
            await connection.end();
        }
    } else {
        res.status(401).send('Not authenticated');
    }
};
