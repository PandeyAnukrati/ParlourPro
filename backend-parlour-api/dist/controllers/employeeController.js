"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmployees = getEmployees;
exports.createEmployee = createEmployee;
exports.updateEmployee = updateEmployee;
exports.deleteEmployee = deleteEmployee;
const Employee_1 = __importDefault(require("../models/Employee"));
const Attendance_1 = __importDefault(require("../models/Attendance"));
const User_1 = __importDefault(require("../models/User"));
const hash_1 = require("../utils/hash");
async function getEmployees(req, res) {
    // Fetch employees from Employee collection
    const employees = await Employee_1.default.find();
    // Fetch admins from User collection (role: 'admin')
    const admins = await User_1.default.find({ role: 'admin' });
    // For each employee, determine today's punch state and last action from attendance logs
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const employeeIds = employees.map(e => e._id ? (typeof e._id === 'object' ? e._id.toString() : String(e._id)) : "");
    const attendanceLogs = await Attendance_1.default.find({
        employeeId: { $in: employeeIds },
        timestamp: { $gte: today },
    }).sort({ timestamp: 1 });
    const punchState = {};
    const lastAction = {};
    employees.forEach(emp => {
        const empId = emp._id ? (typeof emp._id === 'object' ? emp._id.toString() : String(emp._id)) : "";
        const logs = attendanceLogs.filter(l => l.employeeId === empId);
        if (logs.length > 0) {
            punchState[empId] = logs[logs.length - 1].action === 'Punch In';
            lastAction[empId] = logs[logs.length - 1].action;
        }
        else {
            punchState[empId] = false;
            lastAction[empId] = "-";
        }
    });
    // Merge both into a single array with consistent fields
    const merged = [
        ...employees.map(e => {
            const empId = e._id ? (typeof e._id === 'object' ? e._id.toString() : String(e._id)) : "";
            return {
                _id: e._id,
                name: e.name,
                email: e.email,
                role: 'employee',
                isPresent: punchState[empId] || false,
                lastAction: lastAction[empId] || "-",
            };
        }),
        ...admins.map(a => ({
            _id: a._id,
            name: a.name,
            email: a.email,
            role: 'admin',
            isPresent: undefined, // Not tracked for admins
            lastAction: "-",
        })),
    ];
    res.json(merged);
}
async function createEmployee(req, res) {
    const { name, email, password } = req.body;
    if (!name || !email) {
        res.status(400).json({ message: 'Missing fields' });
        return;
    }
    // Check both Employee and User collections for unique email
    const existsInEmployee = await Employee_1.default.findOne({ email });
    const existsInUser = await User_1.default.findOne({ email });
    if (existsInEmployee || existsInUser) {
        res.status(400).json({ message: 'Email already exists' });
        return;
    }
    // If password provided, store it (for employee login)
    const employee = await Employee_1.default.create({ name, email, password: password ? (0, hash_1.hashPassword)(password) : undefined });
    req.io?.emit('employees:update', await Employee_1.default.find());
    res.status(201).json(employee);
}
async function updateEmployee(req, res) {
    const { id } = req.params;
    const { name, email } = req.body;
    // Check both Employee and User collections for unique email (excluding current)
    const existsInEmployee = await Employee_1.default.findOne({ email, _id: { $ne: id } });
    const existsInUser = await User_1.default.findOne({ email, _id: { $ne: id } });
    if (existsInEmployee || existsInUser) {
        res.status(400).json({ message: 'Email already exists' });
        return;
    }
    const employee = await Employee_1.default.findByIdAndUpdate(id, { name, email }, { new: true });
    if (!employee) {
        res.status(404).json({ message: 'Not found' });
        return;
    }
    req.io?.emit('employees:update', await Employee_1.default.find());
    res.json(employee);
}
async function deleteEmployee(req, res) {
    const { id } = req.params;
    // Try to delete from Employee collection
    let employee = await Employee_1.default.findByIdAndDelete(id);
    if (employee) {
        // After deletion, fetch both employees and admins for update
        const employees = await Employee_1.default.find();
        const admins = await User_1.default.find({ role: 'admin' });
        const merged = [
            ...employees.map(e => ({
                _id: e._id,
                name: e.name,
                email: e.email,
                role: 'employee',
            })),
            ...admins.map(a => ({
                _id: a._id,
                name: a.name,
                email: a.email,
                role: 'admin',
            })),
        ];
        req.io?.emit('employees:update', merged);
        res.json({ message: 'Deleted' });
        return;
    }
    // If not found, try to delete from User collection (admin)
    let user = await User_1.default.findById(id);
    if (user && user.role === 'admin') {
        await User_1.default.findByIdAndDelete(id);
        // After deletion, fetch both employees and admins for update
        const employees = await Employee_1.default.find();
        const admins = await User_1.default.find({ role: 'admin' });
        const merged = [
            ...employees.map(e => ({
                _id: e._id,
                name: e.name,
                email: e.email,
                role: 'employee',
            })),
            ...admins.map(a => ({
                _id: a._id,
                name: a.name,
                email: a.email,
                role: 'admin',
            })),
        ];
        req.io?.emit('employees:update', merged);
        res.json({ message: 'Deleted' });
        return;
    }
    res.status(404).json({ message: 'Not found' });
}
