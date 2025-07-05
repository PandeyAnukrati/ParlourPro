"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmployeeProfile = getEmployeeProfile;
const Employee_1 = __importDefault(require("../models/Employee"));
async function getEmployeeProfile(req, res) {
    try {
        const employeeId = req.user?.id;
        if (!employeeId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const employee = await Employee_1.default.findById(employeeId).select('-password');
        if (!employee) {
            res.status(404).json({ message: 'Employee not found' });
            return;
        }
        res.json({ employee });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}
