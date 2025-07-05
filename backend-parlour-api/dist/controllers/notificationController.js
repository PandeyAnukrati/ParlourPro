import Notification from '../models/Notification';
export async function getNotifications(req, res) {
    const notifications = await Notification.find().sort({ timestamp: -1 }).limit(100);
    res.json(notifications);
}
export async function markAllRead(req, res) {
    await Notification.updateMany({ read: false }, { $set: { read: true } });
    res.json({ success: true });
}
export async function createNotification(type, message, io) {
    const notification = await Notification.create({ type, message });
    if (io) {
        console.log("Emitting notification:new", notification);
        io.emit('notification:new', notification);
    }
}
