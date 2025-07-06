import Task from '../models/Task.js';
export async function getTasksForEmployee(req, res) {
    const { employeeId } = req.params;
    const tasks = await Task.find({ assignedTo: employeeId });
    res.json(tasks);
}
//# sourceMappingURL=employeeTaskController.js.map