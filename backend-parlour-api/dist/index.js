"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("./routes/auth"));
const employees_1 = __importDefault(require("./routes/employees"));
const tasks_1 = __importDefault(require("./routes/tasks"));
const attendance_1 = __importDefault(require("./routes/attendance"));
const dashboard_1 = __importDefault(require("./routes/dashboard"));
const notifications_1 = __importDefault(require("./routes/notifications"));
const Attendance_1 = __importDefault(require("./models/Attendance"));
const notificationController_1 = require("./controllers/notificationController");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, { cors: { origin: '*' } });
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Inject io into req for controllers
app.use((req, res, next) => {
    req.io = io;
    next();
});
app.use('/api/auth', auth_1.default);
app.use('/api/employees', employees_1.default);
app.use('/api/tasks', tasks_1.default);
app.use('/api/attendance', attendance_1.default);
app.use('/api/dashboard', dashboard_1.default);
app.use('/api/notifications', notifications_1.default);
app.use('/api/employee', require('./routes/employeeAuth').default);
app.use('/api/employee', require('./routes/employeeProfile').default);
app.use('/api/tasks/employee', require('./routes/employeeTasks').default);
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || '';
mongoose_1.default.connect(MONGO_URI)
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
        if (!token)
            return;
        let user;
        try {
            user = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        }
        catch {
            return;
        }
        // Find employee by email (from user)
        const Employee = require('./models/Employee').default;
        const emp = await Employee.findOne({ email: user.email });
        if (!emp)
            return;
        const id = emp._id.toString();
        const { isPresent } = data;
        const action = isPresent ? 'Punch In' : 'Punch Out';
        const log = await Attendance_1.default.create({
            employeeId: id,
            employeeName: emp.name,
            action,
            timestamp: new Date(),
        });
        io.emit('attendance:update', { id, isPresent });
        io.emit('attendance:log', log);
        await (0, notificationController_1.createNotification)('attendance', `${emp.name} ${action} at ${new Date().toLocaleTimeString()}`, io);
    });
});
