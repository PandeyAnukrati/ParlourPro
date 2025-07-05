"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import dynamic from "next/dynamic";
import { RotateCw } from "lucide-react";
import apiBaseUrl from "@/utils/apiBaseUrl";

const ResponsiveContainer = dynamic(() => import("recharts").then(m => m.ResponsiveContainer), { ssr: false });
const BarChart = dynamic(() => import("recharts").then(m => m.BarChart), { ssr: false });
const Bar = dynamic(() => import("recharts").then(m => m.Bar), { ssr: false });
const XAxis = dynamic(() => import("recharts").then(m => m.XAxis), { ssr: false });
const YAxis = dynamic(() => import("recharts").then(m => m.YAxis), { ssr: false });
const Tooltip = dynamic(() => import("recharts").then(m => m.Tooltip), { ssr: false });

export default function DashboardStats({ token }: { token: string | null }) {
  const [stats, setStats] = useState({ employees: 0, admins: 0, tasks: 0, attendanceToday: 0 });
  const [attendanceData, setAttendanceData] = useState<{ date: string; count: number }[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchStats = () => {
    if (!token) return;
    setLoading(true);
    fetch(`${apiBaseUrl}/api/dashboard/stats`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        setStats(data.stats || stats);
        setAttendanceData(data.attendanceGraph || []);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchStats();
    // eslint-disable-next-line
  }, [token]);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-dashboard-text">{stats.employees}</div>
            <div className="text-sm text-dashboard-text/70">Employees</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-dashboard-text">{stats.admins}</div>
            <div className="text-sm text-dashboard-text/70">Admins</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-dashboard-text">{stats.tasks}</div>
            <div className="text-sm text-dashboard-text/70">Tasks</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-dashboard-text">{stats.attendanceToday}</div>
            <div className="text-sm text-dashboard-text/70">Attendance Today</div>
          </Card>
        </div>
        <button
          onClick={fetchStats}
          className="ml-4 p-2 rounded-full bg-sidebar hover:bg-sidebar/80 transition border border-sidebar-text text-sidebar-text disabled:opacity-50"
          disabled={loading}
          title="Refresh"
        >
          <RotateCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>
      <div className="col-span-1 md:col-span-4 bg-white rounded shadow p-4 mt-4">
        <div className="font-semibold mb-2 text-dashboard-text">Attendance (Last 7 Days)</div>
        <div style={{ width: "100%", height: 180 }}>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={attendanceData}>
              <XAxis dataKey="date" stroke="#6D214F" fontSize={12} />
              <YAxis allowDecimals={false} stroke="#6D214F" fontSize={12} />
              <Tooltip />
              <Bar dataKey="count" fill="#FFAFCC" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
