"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getSocket } from "@/lib/socket";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { CheckCircle, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface Employee {
  _id: string;
  name: string;
  email: string;
  isPresent: boolean;
}

export default function AttendancePage() {
  const { user } = useAuth();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get token from localStorage if available
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    fetch("http://localhost:5000/api/employees", {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setEmployees(data);
        else setEmployees([]);
      })
      .finally(() => setLoading(false));

    // Socket.IO for live updates
    const socket = getSocket();
    socket.on("attendance:update", (data: { id: string; isPresent: boolean }) => {
      setEmployees(prev =>
        prev.map(emp =>
          emp._id === data.id ? { ...emp, isPresent: data.isPresent } : emp
        )
      );
    });
    return () => {
      socket.off("attendance:update");
    };
  }, []);

  const handlePunch = (id: string, isPresent: boolean) => {
    // Send punch in/out via WebSocket
    const socket = getSocket();
    socket.emit("attendance:punch", { id, isPresent: !isPresent });
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center py-10 px-4">
        <div className="w-full max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 text-center text-indigo-700">Attendance Punch</h1>
          <p className="text-center text-neutral-500 mb-8 text-sm">Select your name and punch in or out for today. Your attendance is updated in real time.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {employees.map(emp => (
              <div key={emp._id} className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border border-gray-100 hover:shadow-xl transition">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-semibold text-neutral-800">{emp.name}</span>
                  {emp.isPresent ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-semibold">
                      <CheckCircle className="w-4 h-4" /> Present
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-gray-100 text-gray-500 text-xs font-semibold">
                      <LogOut className="w-4 h-4" /> Absent
                    </span>
                  )}
                </div>
                {user && user.email === emp.email && (
                  <Button
                    className={emp.isPresent ? "bg-red-500 hover:bg-red-600 w-full mt-2" : "bg-green-500 hover:bg-green-600 w-full mt-2"}
                    onClick={() => handlePunch(emp._id, emp.isPresent)}
                  >
                    {emp.isPresent ? "Punch Out" : "Punch In"}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
