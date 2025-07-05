import mongoose, { Schema, Document } from 'mongoose';

export interface IAttendance extends Document {
  employeeId: string;
  employeeName: string;
  action: 'Punch In' | 'Punch Out';
  timestamp: Date;
}

const AttendanceSchema: Schema = new Schema({
  employeeId: { type: String, required: true },
  employeeName: { type: String, required: true },
  action: { type: String, enum: ['Punch In', 'Punch Out'], required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<IAttendance>('Attendance', AttendanceSchema);
