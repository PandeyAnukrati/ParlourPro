import { Request, Response } from 'express';
import Notification from '../models/Notification.js';
import { AuthRequest } from '../middleware/auth.js';

export async function getNotifications(req: AuthRequest, res: Response): Promise<void> {
  const notifications = await Notification.find().sort({ timestamp: -1 }).limit(100);
  res.json(notifications);
}

export async function markAllRead(req: AuthRequest, res: Response): Promise<void> {
  await Notification.updateMany({ read: false }, { $set: { read: true } });
  res.json({ success: true });
}

export async function createNotification(type: 'attendance' | 'admin', message: string, io?: any): Promise<void> {
  const notification = await Notification.create({ type, message });
  if (io) {
    console.log("Emitting notification:new", notification);
    io.emit('notification:new', notification);
  }
}
