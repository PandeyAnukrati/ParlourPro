"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeLogin = employeeLogin;
const Employee_1 = __importDefault(require("../models/Employee"));
const hash_1 = require("../utils/hash");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function employeeLogin(req, res) {
    const { email, password } = req.body;
    const employee = await Employee_1.default.findOne({ email });
    if (!employee || !employee.password)
        return res.status(401).json({ message: 'Invalid credentials' });
    if (!(0, hash_1.comparePassword)(password, employee.password))
        return res.status(401).json({ message: 'Invalid credentials' });
    const token = jsonwebtoken_1.default.sign({ id: employee._id, email: employee.email, role: 'employee' }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, email: employee.email, name: employee.name, role: 'employee', id: employee._id });
}
