"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotifications = getNotifications;
exports.markAllRead = markAllRead;
exports.createNotification = createNotification;
const Notification_1 = __importDefault(require("../models/Notification"));
async function getNotifications(req, res) {
    const notifications = await Notification_1.default.find().sort({ timestamp: -1 }).limit(100);
    res.json(notifications);
}
async function markAllRead(req, res) {
    await Notification_1.default.updateMany({ read: false }, { $set: { read: true } });
    res.json({ success: true });
}
async function createNotification(type, message, io) {
    const notification = await Notification_1.default.create({ type, message });
    if (io) {
        console.log("Emitting notification:new", notification);
        io.emit('notification:new', notification);
    }
}
