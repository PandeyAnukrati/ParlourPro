"use client";
import { useAuth } from "@/context/AuthContext";
import { LogOut, Users, ClipboardList, Clock, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
import EmployeesSection from "@/components/dashboard/EmployeesSection";
import TasksSection from "@/components/dashboard/TasksSection";
import AttendanceSection from "@/components/dashboard/AttendanceSection";
import DashboardStats from "@/components/dashboard/DashboardStats";
import { useRouter } from "next/navigation";
import NotificationSection from "@/components/dashboard/NotificationSection";

export default function DashboardPage() {
  const { user, logout, token } = useAuth();
  const [activeTab, setActiveTab] = useState<"employees" | "tasks" | "attendance">("employees");
  const router = useRouter();

  return (
    <div className="min-h-screen flex bg-dashboard">
      {/* Sidebar */}
      <aside className="h-screen w-72 bg-sidebar shadow-xl flex flex-col justify-between py-8 px-6 fixed left-0 top-0 z-40">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <h2 className="text-xl font-bold text-sidebar-text tracking-tight">ParlourPro</h2>
            <Badge variant="outline" className="capitalize text-sidebar-text border-sidebar-text px-2 py-1 text-xs font-semibold">{user?.role}</Badge>
          </div>
          <nav className="flex flex-col gap-2">
            <button
              className={`flex items-center gap-2 rounded px-3 py-2 transition font-medium text-sidebar-text ${activeTab === "employees" ? "bg-white/80 shadow font-bold" : "hover:bg-white/30"}`}
              onClick={() => setActiveTab("employees")}
            >
              <Users className="w-5 h-5" /> Employees
            </button>
            <button
              className={`flex items-center gap-2 rounded px-3 py-2 transition font-medium text-sidebar-text ${activeTab === "tasks" ? "bg-white/80 shadow font-bold" : "hover:bg-white/30"}`}
              onClick={() => setActiveTab("tasks")}
            >
              <ClipboardList className="w-5 h-5" /> Tasks
            </button>
            <button
              className={`flex items-center gap-2 rounded px-3 py-2 transition font-medium text-sidebar-text ${activeTab === "attendance" ? "bg-white/80 shadow font-bold" : "hover:bg-white/30"}`}
              onClick={() => setActiveTab("attendance")}
            >
              <Clock className="w-5 h-5" /> Attendance
            </button>
          </nav>
        </div>
        <div className="flex flex-col items-center gap-2 mt-8">
          <Avatar className="h-8 w-8 mb-1">
            <AvatarFallback>{user?.email?.[0]?.toUpperCase() || "U"}</AvatarFallback>
          </Avatar>
          <span className="text-xs text-sidebar-text font-medium truncate max-w-[120px] text-center">{user?.email}</span>
          <Button className="mt-2 w-full bg-white text-sidebar-text border border-sidebar-text hover:bg-sidebar-text hover:text-white transition text-xs py-1 px-2" onClick={logout}>
            <LogOut className="w-4 h-4 mr-1" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72 p-10 space-y-10 overflow-y-auto bg-dashboard">
        <div className="flex justify-end items-center gap-4 mb-4">
          <button
            onClick={() => router.push("/")}
            className="p-2 rounded-full bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition"
            title="Go to Home"
            type="button"
          >
            <Home className="w-6 h-6" />
          </button>
          <NotificationSection token={token || ""} />
        </div>
        {/* Welcome message at the top, small and left-aligned */}
        <div className="mb-2">
          <span className="text-dashboard-text text-base font-semibold">Welcome, {user?.email}!</span>
        </div>
        {/* Stats and Graph */}
        <DashboardStats token={token} />
        {/* Only show the selected section */}
        {activeTab === "employees" && (
          <section id="employees">
            <Card className="mb-8 shadow-md bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-dashboard-text"><Users className="w-5 h-5" /> Employees</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-dashboard-text">
                  <EmployeesSection />
                </div>
              </CardContent>
            </Card>
          </section>
        )}
        {activeTab === "tasks" && (
          <section id="tasks">
            <Card className="mb-8 shadow-md bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-dashboard-text"><ClipboardList className="w-5 h-5" /> Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-dashboard-text">
                  <TasksSection />
                </div>
              </CardContent>
            </Card>
          </section>
        )}
        {activeTab === "attendance" && (
          <section id="attendance">
            <Card className="shadow-md bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-dashboard-text"><Clock className="w-5 h-5" /> Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-dashboard-text">
                  <AttendanceSection />
                </div>
              </CardContent>
            </Card>
          </section>
        )}
      </main>
    </div>
  );
}
