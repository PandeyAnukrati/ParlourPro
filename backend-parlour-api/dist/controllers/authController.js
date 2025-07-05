"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
exports.register = register;
const User_1 = __importDefault(require("../models/User"));
const hash_1 = require("../utils/hash");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function login(req, res) {
    const { email, password } = req.body;
    const user = await User_1.default.findOne({ email });
    if (!user)
        return res.status(401).json({ message: 'Invalid credentials' });
    if (!(0, hash_1.comparePassword)(password, user.password))
        return res.status(401).json({ message: 'Invalid credentials' });
    const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, role: user.role, email: user.email });
}
async function register(req, res) {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role)
        return res.status(400).json({ message: 'Missing fields' });
    const exists = await User_1.default.findOne({ email });
    if (exists)
        return res.status(400).json({ message: 'User already exists' });
    const user = await User_1.default.create({ name, email, password: (0, hash_1.hashPassword)(password), role });
    res.status(201).json({ id: user._id, email: user.email, role: user.role });
}
