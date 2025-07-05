import mongoose, { Schema } from 'mongoose';
const NotificationSchema = new Schema({
    type: { type: String, enum: ['attendance', 'admin'], required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    read: { type: Boolean, default: false },
});
export default mongoose.model('Notification', NotificationSchema);
