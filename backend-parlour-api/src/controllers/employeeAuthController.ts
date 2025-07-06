import { Request, Response } from 'express';
import Employee from '../models/Employee.js';
import { comparePassword } from '../utils/hash.js';
import jwt from 'jsonwebtoken';

export async function employeeLogin(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;
  const employee = await Employee.findOne({ email });
  if (!employee || !employee.password) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }
  if (!comparePassword(password, employee.password)) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }
  const token = jwt.sign({ id: employee._id, email: employee.email, role: 'employee' }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
  res.json({ token, email: employee.email, name: employee.name, role: 'employee', id: employee._id });
}
