"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getSocket } from "@/lib/socket";
import { Pencil, Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";

interface Employee {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "employee";
  lastAction?: string;
}

export default function EmployeesSection() {
  const { user, token } = useAuth();
  const isSuperAdmin = user?.role === "superadmin";
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null);
  const [form, setForm] = useState({ name: "", email: "", role: "employee", password: "" });
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/employees", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setEmployees(data);
        else setEmployees([]);
      })
      .catch(() => setError("Failed to load employees"))
      .finally(() => setLoading(false));
    const socket = getSocket();
    socket.on("employees:update", (data: Employee[]) => setEmployees(Array.isArray(data) ? data : []));
    return () => { socket.off("employees:update"); };
  }, [token]);

  const openModal = (emp?: Employee) => {
    setEditEmployee(emp || null);
    setForm(emp ? { name: emp.name, email: emp.email, role: emp.role, password: "" } : { name: "", email: "", role: "employee", password: "" });
    setShowModal(true);
  };
  const closeModal = () => { setShowModal(false); setEditEmployee(null); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (!editEmployee && form.role === "admin") {
        // Create admin via /api/auth/register
        const res = await fetch("http://localhost:5000/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            password: form.password,
            role: "admin",
          }),
        });
        if (!res.ok) throw new Error("Failed to create admin");
        closeModal();
        return;
      }
      // Default: create/edit employee via employees API
      const method = editEmployee ? "PUT" : "POST";
      const url = editEmployee
        ? `http://localhost:5000/api/employees/${editEmployee._id}`
        : "http://localhost:5000/api/employees";
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editEmployee ? { ...form, password: form.password || undefined } : form),
      });
      if (!res.ok) throw new Error("Failed to save employee");
      closeModal();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (id: string) => {
    setDeleting(true);
    setError("");
    try {
      const res = await fetch(`http://localhost:5000/api/employees/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete employee");
      setDeleteId(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <div>Loading employees...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">Employees</h2>
        {isSuperAdmin && (
          <Button onClick={() => openModal()}>Add Employee</Button>
        )}
      </div>
      <div className="border rounded p-4 bg-white overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Name</th>
              <th className="text-left py-2">Email</th>
              <th className="text-left py-2">Role</th>
              {isSuperAdmin && <th className="py-2 text-center">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan={isSuperAdmin ? 4 : 3} className="py-4 text-center text-gray-400">No employees or admins found.</td>
              </tr>
            ) : (
              employees.map(emp => (
                <tr key={emp._id} className="border-b">
                  <td className="py-2">{emp.name}</td>
                  <td className="py-2">{emp.email}</td>
                  <td className="py-2 capitalize">{emp.role}</td>
                  {isSuperAdmin && (
                    <td className="py-2 text-center">
                      {emp.role === "employee" || emp.role === "admin" ? (
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => openModal(emp)}
                            className="inline-flex items-center justify-center p-2 rounded hover:bg-gray-100 transition border border-gray-200 text-gray-700 hover:text-blue-600"
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <button
                                className="inline-flex items-center justify-center p-2 rounded hover:bg-gray-100 transition border border-gray-200 text-gray-700 hover:text-red-600"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Employee/Admin</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete <span className="font-semibold">{emp.name}</span>? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <div className="flex gap-2 justify-end mt-4">
                                <AlertDialogCancel asChild>
                                  <Button className="bg-gray-200 text-black hover:bg-gray-300">Cancel</Button>
                                </AlertDialogCancel>
                                <AlertDialogAction asChild>
                                  <Button
                                    className="bg-red-500 hover:bg-red-600 text-white"
                                    onClick={() => handleDelete(emp._id)}
                                    disabled={deleting}
                                  >
                                    {deleting ? "Deleting..." : "Delete"}
                                  </Button>
                                </AlertDialogAction>
                              </div>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      ) : null}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-sm space-y-4">
            <h3 className="text-lg font-bold mb-2">{editEmployee ? "Edit" : "Add"} Employee/Admin</h3>
            <input
              className="border rounded px-3 py-2 w-full"
              placeholder="Name"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              required
            />
            <input
              className="border rounded px-3 py-2 w-full"
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              required
            />
            <select
              className="border rounded px-3 py-2 w-full"
              value={form.role}
              onChange={e => setForm(f => ({ ...f, role: e.target.value as "admin" | "employee" }))}
              required
            >
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
            <input
              className="border rounded px-3 py-2 w-full"
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              required={!editEmployee}
            />
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <div className="flex gap-2">
              <Button type="submit" className="w-full bg-neutral-900 hover:bg-neutral-800">Save</Button>
              <Button type="button" onClick={closeModal} className="w-full bg-gray-300 text-black">Cancel</Button>
            </div>
          </form>
        </div>
      )}
      {isSuperAdmin && (
        <div className="mt-2 text-sm text-neutral-500">You can add, edit, or delete employees.</div>
      )}
      {!isSuperAdmin && (
        <div className="mt-2 text-sm text-neutral-500">View only. Contact Super Admin for changes.</div>
      )}
    </div>
  );
}
