"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAttendanceLogs = getAttendanceLogs;
exports.getAttendanceState = getAttendanceState;
exports.punchAttendance = punchAttendance;
const Attendance_1 = __importDefault(require("../models/Attendance"));
const Employee_1 = __importDefault(require("../models/Employee"));
const notificationController_1 = require("./notificationController");
async function getAttendanceLogs(req, res) {
    const { employeeName } = req.query;
    let query = {};
    if (employeeName) {
        query = { employeeName };
    }
    const logs = await Attendance_1.default.find(query).sort({ timestamp: -1 }).limit(100);
    res.json(logs);
}
async function getAttendanceState(req, res) {
    try {
        const employeeId = req.user?.id;
        if (!employeeId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const logs = await Attendance_1.default.find({ employeeId, timestamp: { $gte: today } }).sort({ timestamp: 1 });
        const punchedIn = logs.length > 0 && logs[logs.length - 1].action === 'Punch In';
        res.json({ punchedIn });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}
async function punchAttendance(req, res) {
    try {
        const employeeId = req.user?.id;
        if (!employeeId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const employee = await Employee_1.default.findById(employeeId);
        if (!employee) {
            res.status(404).json({ message: 'Employee not found' });
            return;
        }
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const logs = await Attendance_1.default.find({ employeeId, timestamp: { $gte: today } }).sort({ timestamp: 1 });
        let action = 'Punch In';
        if (logs.length > 0 && logs[logs.length - 1].action === 'Punch In') {
            action = 'Punch Out';
        }
        const attendance = await Attendance_1.default.create({ employeeId, employeeName: employee.name, action, timestamp: new Date() });
        if (req.io) {
            await (0, notificationController_1.createNotification)('attendance', `${employee.name} ${action} at ${new Date().toLocaleTimeString()}`, req.io);
        }
        res.json({ message: `Successfully ${action === 'Punch In' ? 'punched in' : 'punched out'}.`, attendance });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}
