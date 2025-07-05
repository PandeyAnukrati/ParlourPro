import Task from '../models/Task';
export async function getTasks(req, res) {
    const tasks = await Task.find().populate('assignedTo', 'name');
    res.json(tasks);
}
export async function createTask(req, res) {
    const { title, assignedTo } = req.body;
    if (!title || !assignedTo) {
        res.status(400).json({ message: 'Missing fields' });
        return;
    }
    const task = await Task.create({ title, assignedTo });
    const tasks = await Task.find().populate('assignedTo', 'name');
    req.io?.emit('tasks:update', tasks);
    res.status(201).json(task);
}
export async function updateTask(req, res) {
    const { id } = req.params;
    const { title, assignedTo } = req.body;
    const task = await Task.findByIdAndUpdate(id, { title, assignedTo }, { new: true });
    if (!task) {
        res.status(404).json({ message: 'Not found' });
        return;
    }
    const tasks = await Task.find().populate('assignedTo', 'name');
    req.io?.emit('tasks:update', tasks);
    res.json(task);
}
export async function deleteTask(req, res) {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
        res.status(404).json({ message: 'Not found' });
        return;
    }
    const tasks = await Task.find().populate('assignedTo', 'name');
    req.io?.emit('tasks:update', tasks);
    res.json({ message: 'Deleted' });
}
//# sourceMappingURL=taskController.js.map