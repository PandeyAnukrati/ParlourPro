import { Request, Response } from 'express';
import Attendance from '../models/Attendance.js';
import Employee from '../models/Employee.js';
import { AuthRequest } from '../middleware/auth.js';
import { createNotification } from './notificationController.js';

export async function getAttendanceLogs(req: Request, res: Response): Promise<void> {
  const { employeeName } = req.query;
  let query = {};
  if (employeeName) {
    query = { employeeName };
  }
  const logs = await Attendance.find(query).sort({ timestamp: -1 }).limit(100);
  res.json(logs);
}

export async function getAttendanceState(req: AuthRequest, res: Response): Promise<void> {
  try {
    const employeeId = req.user?.id;
    if (!employeeId) { res.status(401).json({ message: 'Unauthorized' }); return; }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const logs = await Attendance.find({ employeeId, timestamp: { $gte: today } }).sort({ timestamp: 1 });
    const punchedIn = logs.length > 0 && logs[logs.length - 1].action === 'Punch In';
    res.json({ punchedIn });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}

export async function punchAttendance(req: AuthRequest, res: Response): Promise<void> {
  try {
    const employeeId = req.user?.id;
    if (!employeeId) { res.status(401).json({ message: 'Unauthorized' }); return; }
    const employee = await Employee.findById(employeeId);
    if (!employee) { res.status(404).json({ message: 'Employee not found' }); return; }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const logs = await Attendance.find({ employeeId, timestamp: { $gte: today } }).sort({ timestamp: 1 });
    let action = 'Punch In';
    if (logs.length > 0 && logs[logs.length - 1].action === 'Punch In') {
      action = 'Punch Out';
    }
    const attendance = await Attendance.create({ employeeId, employeeName: employee.name, action, timestamp: new Date() });
    if (req.io) {
      await createNotification('attendance', `${employee.name} ${action} at ${new Date().toLocaleTimeString()}`, req.io);
    }
    res.json({ message: `Successfully ${action === 'Punch In' ? 'punched in' : 'punched out'}.`, attendance });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}
