import { Request, Response } from 'express';
import Task from '../models/Task';

export async function getTasksForEmployee(req: Request, res: Response) {
  const { employeeId } = req.params;
  const tasks = await Task.find({ assignedTo: employeeId });
  res.json(tasks);
}
