"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
}

interface Employee {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export default function UserDashboard() {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [attendanceLoading, setAttendanceLoading] = useState(false);
  const [punchedIn, setPunchedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("employeeToken");
    if (!token) {
      router.push("/user-login");
      return;
    }
    fetchProfileAndTasks(token);
    fetchAttendanceState(token);
  }, []);

  const fetchProfileAndTasks = async (token: string) => {
    try {
      // Fetch employee profile
      const profileRes = await fetch("http://localhost:5000/api/employee/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!profileRes.ok) throw new Error("Failed to fetch profile");
      const profileData = await profileRes.json();
      setEmployee(profileData.employee);

      // Fetch tasks for employee
      const tasksRes = await fetch(`http://localhost:5000/api/tasks/employee/${profileData.employee._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!tasksRes.ok) throw new Error("Failed to fetch tasks");
      const tasksData = await tasksRes.json();
      setTasks(tasksData);
    } catch (err) {
      toast.error("Session expired. Please login again.");
      localStorage.removeItem("employeeToken");
      router.push("/user-login");
    } finally {
      setLoading(false);
    }
  };

  const fetchAttendanceState = async (token: string) => {
    try {
      const res = await fetch("http://localhost:5000/api/attendance/state", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setPunchedIn(data.punchedIn);
    } catch {
      setPunchedIn(false);
    }
  };

  const handlePunch = async () => {
    setAttendanceLoading(true);
    const token = localStorage.getItem("employeeToken");
    try {
      const res = await fetch("http://localhost:5000/api/attendance/punch", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Attendance marked!");
        setPunchedIn(!punchedIn);
      } else {
        toast.error(data.message || "Failed to mark attendance");
      }
    } catch {
      toast.error("Network error");
    } finally {
      setAttendanceLoading(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (!employee) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-indigo-700 mb-2">Welcome, {employee.name}</h2>
        <div className="mb-4 text-gray-600">Role: {employee.role}</div>
        <div className="mb-6">
          <button
            onClick={handlePunch}
            className={`px-6 py-2 rounded-lg font-semibold shadow transition ${punchedIn ? "bg-red-500 hover:bg-red-600 text-white" : "bg-green-500 hover:bg-green-600 text-white"}`}
            disabled={attendanceLoading}
          >
            {attendanceLoading ? "Processing..." : punchedIn ? "Punch Out" : "Punch In"}
          </button>
        </div>
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-indigo-600 mb-2">Your Tasks</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tasks.length === 0 && <div className="text-gray-500">No tasks assigned.</div>}
            {tasks.map(task => (
              <div key={task._id} className="border rounded-lg p-4 shadow-sm bg-gray-50">
                <div className="font-bold text-lg mb-1">{task.title}</div>
                <div className="text-gray-700 mb-2">{task.description}</div>
                <div className="text-sm mb-2">Status: <span className={task.status === "completed" ? "text-green-600" : "text-yellow-600"}>{task.status}</span></div>
                {/* Optionally, add a button to mark as completed if not already */}
              </div>
            ))}
          </div>
        </div>
        <div className="text-right">
          <button
            className="text-sm text-gray-500 underline hover:text-indigo-600"
            onClick={() => {
              localStorage.removeItem("employeeToken");
              router.push("/user-login");
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
