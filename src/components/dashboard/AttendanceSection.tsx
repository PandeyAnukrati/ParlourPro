"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState, useMemo } from "react";
import { getSocket } from "@/lib/socket";
import { toast } from "sonner";
import { BadgeCheck, LogOut } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import apiBaseUrl from "@/utils/apiBaseUrl";

interface AttendanceLog {
  _id: string;
  employeeName: string;
  action: "Punch In" | "Punch Out";
  timestamp: string;
}

export default function AttendanceSection() {
  const { token } = useAuth();
  const [logs, setLogs] = useState<AttendanceLog[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [employeeLogs, setEmployeeLogs] = useState<AttendanceLog[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (!token) return;
    // Fetch attendance logs from backend (replace with real API)
    fetch(`${apiBaseUrl}/api/attendance`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setLogs(data);
        else setLogs([]);
      });

    // Socket.IO for live updates
    const socket = getSocket();
    socket.on("attendance:log", (log: AttendanceLog) => {
      setLogs(prev => [log, ...prev]);
      toast(`${log.employeeName} ${log.action} at ${new Date(log.timestamp).toLocaleTimeString()}`, {
        description: "Attendance Update",
        duration: 4000,
      });
    });
    return () => {
      socket.off("attendance:log");
    };
  }, [token]);

  // Fetch logs for selected employee
  useEffect(() => {
    if (!selectedEmployee || !token) return;
    fetch(`$${apiBaseUrl}/api/attendance?employeeName=${encodeURIComponent(selectedEmployee)}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setEmployeeLogs(Array.isArray(data) ? data : []));
  }, [selectedEmployee, token]);

  // Group logs by date
  const groupedLogs = useMemo(() => {
    const groups: { [date: string]: AttendanceLog[] } = {};
    employeeLogs.forEach(log => {
      const date = new Date(log.timestamp).toLocaleDateString();
      if (!groups[date]) groups[date] = [];
      groups[date].push(log);
    });
    return groups;
  }, [employeeLogs]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Attendance</h2>
      <div className="border rounded p-4 bg-white max-h-64 overflow-y-auto">
        {logs.length === 0 ? (
          <div className="text-neutral-500">No attendance logs yet.</div>
        ) : (
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Employee</th>
                <th className="text-left py-2">Action</th>
                <th className="text-left py-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {logs.map(log => (
                <tr key={log._id} className="border-b hover:bg-neutral-50 transition">
                  <td className="py-2 flex items-center gap-2">
                    <button
                      className="font-medium text-neutral-700 hover:text-blue-600 focus:underline focus:outline-none"
                      style={{ textDecoration: 'none' }}
                      onClick={() => {
                        setSelectedEmployee(log.employeeName);
                        setDialogOpen(true);
                      }}
                    >
                      {log.employeeName}
                    </button>
                  </td>
                  <td className="py-2">
                    {log.action === "Punch In" ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-semibold">
                        <BadgeCheck className="w-4 h-4" /> Punch In
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-red-100 text-red-700 text-xs font-semibold">
                        <LogOut className="w-4 h-4" /> Punch Out
                      </span>
                    )}
                  </td>
                  <td className="py-2 text-neutral-400">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="mt-1 text-xs text-neutral-400">Click an employee&apos;s name to view their daily punch logs.</div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-xl p-0 overflow-hidden">
          <DialogHeader className="bg-[#FFAFCC] px-6 py-4 border-b">
            <DialogTitle className="text-lg font-bold text-sidebar-text">{selectedEmployee}&apos;s Daily Attendance</DialogTitle>
            <DialogDescription className="text-xs text-sidebar-text/80">All punch in/out records for this employee, grouped by day.</DialogDescription>
          </DialogHeader>
          <div className="p-6 bg-white max-h-96 overflow-y-auto">
            {Object.keys(groupedLogs).length === 0 ? (
              <div className="text-neutral-500 py-4">No records found.</div>
            ) : (
              <div className="space-y-6">
                {Object.entries(groupedLogs).map(([date, logs]) => (
                  <div key={date} className="bg-neutral-50 rounded-lg p-3 border">
                    <div className="font-semibold text-sm text-neutral-700 mb-2">{date}</div>
                    <ul className="space-y-1">
                      {logs.map(log => (
                        <li key={log._id} className="flex items-center gap-2 text-xs">
                          {log.action === "Punch In" ? (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-green-100 text-green-700 font-semibold">
                              <BadgeCheck className="w-3 h-3" /> Punch In
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-red-100 text-red-700 font-semibold">
                              <LogOut className="w-3 h-3" /> Punch Out
                            </span>
                          )}
                          <span className="text-neutral-400">{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      <div className="mt-2 text-sm text-neutral-500">Live updates when employees punch in/out.</div>
    </div>
  );
}
