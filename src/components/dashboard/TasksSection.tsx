"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getSocket } from "@/lib/socket";
import { Pencil, Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import apiBaseUrl from "@/utils/apiBaseUrl";

interface Task {
  _id: string;
  title: string;
  assignedTo: { _id: string; name: string } | string;
}

interface Employee {
  _id: string;
  name: string;
}

export default function TasksSection() {
  const { user, token } = useAuth();
  const isSuperAdmin = user?.role === "superadmin";
  const [tasks, setTasks] = useState<Task[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [form, setForm] = useState({ title: "", assignedTo: "" });
  const [deleteTaskId, setDeleteTaskId] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${apiBaseUrl}/api/tasks`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setTasks(Array.isArray(data) ? data : data.tasks || []))
      .catch(() => setError("Failed to load tasks"))
      .finally(() => setLoading(false));
    const socket = getSocket();
    socket.on("tasks:update", (data: unknown) => {
      if (Array.isArray(data)) setTasks(data as Task[]);
      else if (data && typeof data === "object" && "tasks" in data) setTasks((data as { tasks: Task[] }).tasks);
      else setTasks([]);
    });
    return () => { socket.off("tasks:update"); };
  }, [token]);

  useEffect(() => {
    // Fetch employees for dropdown
    fetch(`${apiBaseUrl}/api/employees`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setEmployees(data))
      .catch(() => setEmployees([]));
  }, [token]);

  const openModal = (task?: Task) => {
    setEditTask(task || null);
    setForm(task
      ? {
          title: task.title,
          assignedTo:
            typeof task.assignedTo === 'object' && task.assignedTo !== null
              ? task.assignedTo._id
              : task.assignedTo || "",
        }
      : { title: "", assignedTo: "" }
    );
    setShowModal(true);
  };
  const closeModal = () => { setShowModal(false); setEditTask(null); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const method = editTask ? "PUT" : "POST";
      const url = editTask
        ? `${apiBaseUrl}/api/tasks/${editTask._id}`
        : `${apiBaseUrl}/api/tasks`;
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: form.title, assignedTo: { _id: form.assignedTo } }),
      });
      if (!res.ok) throw new Error("Failed to save task");
      closeModal();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Failed to save task");
    }
  };

  const handleDelete = async (id: string) => {
    setDeleteTaskId(id);
  };
  const confirmDelete = async () => {
    if (!deleteTaskId) return;
    try {
      const res = await fetch(`${apiBaseUrl}/api/tasks/${deleteTaskId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete task");
      setDeleteTaskId(null);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Failed to delete task");
    }
  };

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">Tasks</h2>
        {isSuperAdmin && (
          <Button onClick={() => openModal()}>Add Task</Button>
        )}
      </div>
      <div className="border rounded p-4 bg-white overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Title</th>
              <th className="text-left py-2">Assigned To</th>
              {isSuperAdmin && <th className="py-2">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task._id} className="border-b">
                <td className="py-2">{task.title}</td>
                <td className="py-2">
                  {typeof task.assignedTo === "object" && task.assignedTo !== null
                    ? task.assignedTo.name
                    : <span className="text-red-500">[Unknown]</span>}
                </td>
                {isSuperAdmin ? (
                  <td className="py-2 space-x-2 text-center min-w-[110px]">
                    <button
                      onClick={() => openModal(task)}
                      className="inline-flex items-center justify-center p-2 rounded hover:bg-gray-100 transition border border-gray-200 text-gray-700 hover:text-blue-600"
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <AlertDialog open={deleteTaskId === task._id}>
                      <AlertDialogTrigger asChild>
                        <button
                          onClick={() => handleDelete(task._id)}
                          className="inline-flex items-center justify-center p-2 rounded hover:bg-gray-100 transition border border-gray-200 text-gray-700 hover:text-red-600"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Task?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this task? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="flex justify-end gap-2 mt-4">
                          <AlertDialogCancel onClick={() => setDeleteTaskId(null)}>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
                        </div>
                      </AlertDialogContent>
                    </AlertDialog>
                  </td>
                ) : (
                  <td className="py-2 min-w-[110px]"></td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-sm space-y-4">
            <h3 className="text-lg font-bold mb-2">{editTask ? "Edit" : "Add"} Task</h3>
            <input
              className="border rounded px-3 py-2 w-full"
              placeholder="Title"
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              required
            />
            <select
              className="border rounded px-3 py-2 w-full"
              value={form.assignedTo}
              onChange={e => setForm(f => ({ ...f, assignedTo: e.target.value }))}
              required
            >
              <option value="">Select Employee</option>
              {employees.map(emp => (
                <option key={emp._id} value={emp._id}>{emp.name}</option>
              ))}
            </select>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <div className="flex gap-2">
              <Button type="submit" className="w-full bg-neutral-900 hover:bg-neutral-800">Save</Button>
              <Button type="button" onClick={closeModal} className="w-full bg-gray-300 text-black">Cancel</Button>
            </div>
          </form>
        </div>
      )}
      {isSuperAdmin && (
        <div className="mt-2 text-sm text-neutral-500">You can assign, update, or delete tasks.</div>
      )}
      {!isSuperAdmin && (
        <div className="mt-2 text-sm text-neutral-500">View only. Contact Super Admin for changes.</div>
      )}
    </div>
  );
}
