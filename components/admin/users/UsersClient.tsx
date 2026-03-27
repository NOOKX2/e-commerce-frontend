"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type AdminUser = {
  ID: number;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
};

const statuses = ["active", "suspended", "banned"];

export default function UsersClient({ initialUsers }: { initialUsers: AdminUser[] }) {
  const [users, setUsers] = useState(initialUsers);

  async function updateStatus(userID: number, status: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_API_URL}/v1/admin/users/${userID}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ status }),
    });
    const payload = await res.json().catch(() => ({}));
    if (!res.ok || !payload?.success) {
      throw new Error(payload?.error ?? "Failed to update status");
    }
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-xs">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 text-gray-600 font-medium">
          <tr>
            <th className="px-6 py-3">ID</th>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Role</th>
            <th className="px-6 py-3">Joined</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {users.map((u) => (
            <tr key={u.ID}>
              <td className="px-6 py-4">{u.ID}</td>
              <td className="px-6 py-4">{u.name}</td>
              <td className="px-6 py-4">{u.email}</td>
              <td className="px-6 py-4 uppercase">{u.role}</td>
              <td className="px-6 py-4">{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "-"}</td>
              <td className="px-6 py-4">
                <Select
                  value={u.status}
                  onValueChange={(value) => {
                    setUsers((prev) => prev.map((x) => (x.ID === u.ID ? { ...x, status: value } : x)));
                  }}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((s) => (
                      <SelectItem value={s} key={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </td>
              <td className="px-6 py-4 text-right">
                <Button
                  variant="outline"
                  onClick={async () => {
                    try {
                      await updateStatus(u.ID, u.status);
                      toast.success("User status updated");
                    } catch (e) {
                      toast.error(e instanceof Error ? e.message : "Update failed");
                    }
                  }}
                >
                  Save
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

