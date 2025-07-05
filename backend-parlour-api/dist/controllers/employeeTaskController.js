"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTasksForEmployee = getTasksForEmployee;
const Task_1 = __importDefault(require("../models/Task"));
async function getTasksForEmployee(req, res) {
    const { employeeId } = req.params;
    const tasks = await Task_1.default.find({ assignedTo: employeeId });
    res.json(tasks);
}
