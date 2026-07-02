import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../../components/ui/Button";
import { EmptyState } from "../../components/ui/EmptyState";
import { createAdmin, getAllAdmins, updateAdminRole, deleteAdmin } from "../../services/adminService";
import type { AdminRole, AdminUser } from "../../types";

export function AdminAdmins() {
  const queryClient = useQueryClient();
  const { data: admins, isLoading } = useQuery({ queryKey: ["admins"], queryFn: getAllAdmins });
  const [showForm, setShowForm] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<AdminUser | null>(null);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<AdminRole>("admin");

  const createMut = useMutation({
    mutationFn: () => createAdmin({ username: username.trim(), full_name: fullName.trim() || undefined, password, role }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admins"] });
      setShowForm(false);
      setUsername("");
      setFullName("");
      setPassword("");
      setRole("admin");
    },
  });

  const roleMut = useMutation({
    mutationFn: ({ id, role }: { id: string; role: AdminRole }) => updateAdminRole(id, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admins"] });
      setEditingAdmin(null);
    },
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => deleteAdmin(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admins"] }),
  });


  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1F2937] dark:text-slate-100">Admins</h1>
          <p className="text-sm text-[#6B7280] dark:text-slate-400">Super Admins can create and manage admin accounts.</p>
        </div>
        <Button onClick={() => setShowForm((v) => !v)}>
          <Plus className="w-4 h-4" /> Add Admin
        </Button>
      </div>

      {showForm && (
        <div className="rounded-2xl border border-[#EAECEF] bg-white p-5 mb-6 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-[#1F2937] dark:text-slate-100">Create Admin</h2>
            <button onClick={() => setShowForm(false)} className="text-[#6B7280] dark:text-slate-400">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="w-full rounded-xl border border-[#EAECEF] bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" />
            <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full name" className="w-full rounded-xl border border-[#EAECEF] bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" className="w-full rounded-xl border border-[#EAECEF] bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" />
            <select value={role} onChange={(e) => setRole(e.target.value as AdminRole)} className="w-full rounded-xl border border-[#EAECEF] bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100">
              <option value="admin">Admin</option>
              <option value="super_admin">Super Admin</option>
            </select>
          </div>
          <div className="mt-4 flex gap-2">
            <Button onClick={() => createMut.mutate()} disabled={!username.trim() || !password.trim()}>Create</Button>
            <Button variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </div>
      )}

      {editingAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#1F2937] dark:text-slate-100">Edit Admin Role</h2>
              <button onClick={() => setEditingAdmin(null)} className="p-1.5 rounded-xl text-[#6B7280] hover:text-[#1F2937] hover:bg-[#EAECEF]/50 transition-all duration-150 cursor-pointer dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-[#1F2937] dark:text-slate-100 mb-2">Username</p>
                <p className="text-[#6B7280] dark:text-slate-400">{editingAdmin.username}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1F2937] dark:text-slate-100 mb-2">Role</label>
                <select
                  value={editingAdmin.role}
                  onChange={(e) => setEditingAdmin({ ...editingAdmin, role: e.target.value as AdminRole })}
                  className="w-full rounded-xl border border-[#EAECEF] bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                >
                  <option value="admin">Admin</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="secondary" onClick={() => setEditingAdmin(null)}>Cancel</Button>
              <Button onClick={() => roleMut.mutate({ id: editingAdmin.id, role: editingAdmin.role })} disabled={roleMut.isPending}>
                Save
              </Button>
            </div>
          </div>
        </div>
      )}

      {!isLoading && (!admins || admins.length === 0) && <EmptyState title="No admins" description="Create the first admin account." />}

      <div className="space-y-2">
        {admins?.map((admin: AdminUser) => (
          <div key={admin.id} className="rounded-2xl border border-[#EAECEF] bg-white p-4 flex items-center justify-between dark:border-slate-800 dark:bg-slate-900">
            <div>
              <p className="font-medium text-[#1F2937] dark:text-slate-100">{admin.username}</p>
              <p className="text-sm text-[#6B7280] dark:text-slate-400">{admin.full_name ?? "No name"} — {admin.role}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setEditingAdmin(admin)}
              >
                <Pencil className="w-4 h-4" /> Edit
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  if (confirm(`Delete admin "${admin.username}"? This action cannot be undone.`)) {
                    deleteMut.mutate(admin.id);
                  }
                }}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

