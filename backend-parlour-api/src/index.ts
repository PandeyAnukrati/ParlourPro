import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import employeeRoutes from './routes/employees';
import taskRoutes from './routes/tasks';
import attendanceRoutes from './routes/attendance';
import dashboardRoutes from './routes/dashboard';
import notificationRoutes from './routes/notifications';
import employeeAuthRoutes from './routes/employeeAuth';
import employeeProfileRoutes from './routes/employeeProfile';
import employeeTaskRoutes from './routes/employeeTasks';
import { AuthRequest } from './middleware/auth';
import Attendance from './models/Attendance';
import Employee from './models/Employee';
import { createNotification } from './controllers/notificationController';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Inject io into req for controllers
app.use((req, res, next) => {
  (req as AuthRequest).io = io;
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/employee', employeeAuthRoutes);
app.use('/api/employee', employeeProfileRoutes);
app.use('/api/tasks/employee', employeeTaskRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || '';

mongoose.connect(MONGO_URI)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Socket.IO attendance handlers
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  socket.on('attendance:punch', async (data) => {
    // Authenticate user from token in handshake
    const token = socket.handshake.auth?.token;
    if (!token) return;
    let user: any;
    try {
      user = jwt.verify(token, process.env.JWT_SECRET as string);
    } catch {
      return;
    }
    // Find employee by email (from user)
    const emp = await Employee.findOne({ email: user.email });
    if (!emp) return;
    const id = (emp._id as any).toString();
    const { isPresent } = data;
    const action = isPresent ? 'Punch In' : 'Punch Out';
    const log = await Attendance.create({
      employeeId: id,
      employeeName: emp.name,
      action,
      timestamp: new Date(),
    });
    io.emit('attendance:update', { id, isPresent });
    io.emit('attendance:log', log);
    await createNotification('attendance', `${emp.name} ${action} at ${new Date().toLocaleTimeString()}`, io);
  });
});
