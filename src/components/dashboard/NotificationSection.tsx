"use client";
import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getSocket } from "@/lib/socket";
import { toast } from "sonner";

interface Notification {
  _id: string;
  type: "attendance" | "admin";
  message: string;
  timestamp: string;
  read: boolean;
}

export default function NotificationSection({ token }: { token: string }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);

  // Fetch notifications
  useEffect(() => {
    fetch("http://localhost:5000/api/notifications", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setNotifications(Array.isArray(data) ? data : []));
    // Listen for real-time updates
    const socket = getSocket();
    socket.on("notification:new", (notif: Notification) => {
      console.log("Received notification", notif);
      setNotifications(prev => [notif, ...prev]);
      toast(notif.message, {
        description: notif.type === "attendance" ? "Attendance Notification" : "Admin Notification",
        duration: 4000,
      });
    });
    return () => { socket.off("notification:new"); };
  }, [token]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    // Optionally, send to backend
    fetch("http://localhost:5000/api/notifications/mark-all-read", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  return (
    <div className="relative inline-block text-left">
      <button
        className="relative p-2 rounded-full hover:bg-gray-100 transition"
        onClick={() => setOpen(o => !o)}
        title="Notifications"
      >
        <Bell className="w-6 h-6 text-gray-700" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 font-bold">
            {unreadCount}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border rounded shadow-lg z-50 max-h-96 overflow-y-auto">
          <div className="flex items-center justify-between px-4 py-2 border-b">
            <span className="font-semibold text-gray-700">Notifications</span>
            <button className="text-xs text-blue-600 hover:underline" onClick={markAllRead}>Mark all as read</button>
          </div>
          {notifications.length === 0 ? (
            <div className="p-4 text-neutral-400 text-sm">No notifications yet.</div>
          ) : (
            <ul className="divide-y">
              {notifications.map(n => (
                <li key={n._id} className={`px-4 py-3 flex gap-2 items-start ${n.read ? "bg-white" : "bg-blue-50"}`}>
                  <Badge className={n.type === "attendance" ? "bg-green-100 text-green-700" : "bg-indigo-100 text-indigo-700"}>
                    {n.type === "attendance" ? "Attendance" : "Admin"}
                  </Badge>
                  <div className="flex-1">
                    <div className="text-sm text-gray-800">{n.message}</div>
                    <div className="text-xs text-gray-400 mt-1">{new Date(n.timestamp).toLocaleString()}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
