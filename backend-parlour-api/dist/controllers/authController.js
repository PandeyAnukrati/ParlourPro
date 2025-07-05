import User from '../models/User';
import { hashPassword, comparePassword } from '../utils/hash';
import jwt from 'jsonwebtoken';
export async function login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
    }
    if (!comparePassword(password, user.password)) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
    }
    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, role: user.role, email: user.email });
}
export async function register(req, res) {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
        res.status(400).json({ message: 'Missing fields' });
        return;
    }
    const exists = await User.findOne({ email });
    if (exists) {
        res.status(400).json({ message: 'User already exists' });
        return;
    }
    const user = await User.create({ name, email, password: hashPassword(password), role });
    res.status(201).json({ id: user._id, email: user.email, role: user.role });
}
//# sourceMappingURL=authController.js.map