"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTasks = getTasks;
exports.createTask = createTask;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;
const Task_1 = __importDefault(require("../models/Task"));
async function getTasks(req, res) {
    const tasks = await Task_1.default.find().populate('assignedTo', 'name');
    res.json(tasks);
}
async function createTask(req, res) {
    const { title, assignedTo } = req.body;
    if (!title || !assignedTo) {
        res.status(400).json({ message: 'Missing fields' });
        return;
    }
    const task = await Task_1.default.create({ title, assignedTo });
    const tasks = await Task_1.default.find().populate('assignedTo', 'name');
    req.io?.emit('tasks:update', tasks);
    res.status(201).json(task);
}
async function updateTask(req, res) {
    const { id } = req.params;
    const { title, assignedTo } = req.body;
    const task = await Task_1.default.findByIdAndUpdate(id, { title, assignedTo }, { new: true });
    if (!task) {
        res.status(404).json({ message: 'Not found' });
        return;
    }
    const tasks = await Task_1.default.find().populate('assignedTo', 'name');
    req.io?.emit('tasks:update', tasks);
    res.json(task);
}
async function deleteTask(req, res) {
    const { id } = req.params;
    const task = await Task_1.default.findByIdAndDelete(id);
    if (!task) {
        res.status(404).json({ message: 'Not found' });
        return;
    }
    const tasks = await Task_1.default.find().populate('assignedTo', 'name');
    req.io?.emit('tasks:update', tasks);
    res.json({ message: 'Deleted' });
}
