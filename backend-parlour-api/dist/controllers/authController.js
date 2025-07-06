import User from '../models/User';
import { hashPassword, comparePassword } from '../utils/hash';
import jwt from 'jsonwebtoken';
export async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: 'Email and password are required' });
            return;
        }
        const user = await User.findOne({ email });
        if (!user) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }
        if (!comparePassword(password, user.password)) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            console.error('JWT_SECRET is not defined in environment variables');
            res.status(500).json({ message: 'Server configuration error' });
            return;
        }
        const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, jwtSecret, { expiresIn: '1d' });
        res.json({ token, role: user.role, email: user.email });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
export async function register(req, res) {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role) {
            res.status(400).json({ message: 'Missing fields: name, email, password, and role are required' });
            return;
        }
        if (!['superadmin', 'admin'].includes(role)) {
            res.status(400).json({ message: 'Invalid role. Must be either superadmin or admin' });
            return;
        }
        const exists = await User.findOne({ email });
        if (exists) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }
        const user = await User.create({
            name,
            email,
            password: hashPassword(password),
            role
        });
        res.status(201).json({
            id: user._id,
            email: user.email,
            role: user.role,
            message: 'User created successfully'
        });
    }
    catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
//# sourceMappingURL=authController.js.map