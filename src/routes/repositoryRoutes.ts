import express, { Request, Response, RequestHandler } from 'express';
import User from '../models/user';

const router = express.Router();

// Route pour créer un utilisateur
const createUser: RequestHandler = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            res.status(400).json({ message: 'All fields are required' });
            return;
        }

        const user = await User.create({ username, email, password });
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error: any) {
        if (error.code === 11000) {
            res.status(400).json({ message: 'Username or email already exists' });
            return;
        }
        res.status(500).json({ message: error.message });
    }
};

router.post('/', createUser);

export default router;
