import mongoose, { Schema, Document } from 'mongoose';

export interface INotification extends Document {
  type: 'attendance' | 'admin';
  message: string;
  timestamp: Date;
  read: boolean;
}

const NotificationSchema: Schema = new Schema({
  type: { type: String, enum: ['attendance', 'admin'], required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
});

export default mongoose.model<INotification>('Notification', NotificationSchema);
