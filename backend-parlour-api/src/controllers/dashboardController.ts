import { Request, Response } from 'express';
import Employee from '../models/Employee.js';
import User from '../models/User.js';
import Task from '../models/Task.js';
import Attendance from '../models/Attendance.js';

export async function getDashboardStats(req: Request, res: Response): Promise<void> {
  // Count employees (from Employee collection)
  const employeesCount = await Employee.countDocuments();
  // Count admins (from User collection)
  const adminsCount = await User.countDocuments({ role: 'admin' });
  // Count tasks
  const tasksCount = await Task.countDocuments();
  // Attendance today
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const attendanceToday = await Attendance.countDocuments({ timestamp: { $gte: today } });

  // Attendance for last 7 days (group by day)
  const last7 = new Date();
  last7.setDate(today.getDate() - 6);
  last7.setHours(0, 0, 0, 0);
  const attendanceGraph = await Attendance.aggregate([
    { $match: { timestamp: { $gte: last7 } } },
    { $group: {
      _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
      count: { $sum: 1 }
    }},
    { $sort: { _id: 1 } }
  ]);
  // Fill missing days
  const graphData: { date: string; count: number }[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(last7);
    d.setDate(last7.getDate() + i);
    const dateStr = d.toISOString().slice(0, 10);
    const found = attendanceGraph.find((g: any) => g._id === dateStr);
    graphData.push({ date: dateStr, count: found ? found.count : 0 });
  }

  res.json({
    stats: {
      employees: employeesCount,
      admins: adminsCount,
      tasks: tasksCount,
      attendanceToday,
    },
    attendanceGraph: graphData,
  });
}
