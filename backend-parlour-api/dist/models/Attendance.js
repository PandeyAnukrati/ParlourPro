import mongoose, { Schema } from 'mongoose';
const AttendanceSchema = new Schema({
    employeeId: { type: String, required: true },
    employeeName: { type: String, required: true },
    action: { type: String, enum: ['Punch In', 'Punch Out'], required: true },
    timestamp: { type: Date, default: Date.now },
});
export default mongoose.model('Attendance', AttendanceSchema);
