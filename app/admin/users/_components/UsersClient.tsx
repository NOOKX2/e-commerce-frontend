"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import AdminUnifiedToolbar from "@/components/dashboard/AdminUnifiedToolbar";
import { useAdminBatchPendingSafe } from "@/app/admin/_components/AdminBatchPendingContext";
import { AdminUser } from "@/types/user";
import AdminUserTable from "@/app/admin/users/_components/AdminUserTable";
import AdminUsersFilters from "@/app/admin/users/_components/AdminUsersFilters";

export default function UsersClient({ initialUsers }: { initialUsers: AdminUser[] }) {
  const [users, setUsers] = useState(initialUsers);
  const [isSaving, setIsSaving] = useState(false);
  const batch = useAdminBatchPendingSafe();

  useEffect(() => {
    setUsers(initialUsers);
  }, [initialUsers]);

  const changedUsers = useMemo(() => {
    return users.filter((u) => {
      const original = initialUsers.find((item) => item.ID === u.ID);
      return original && u.status !== original.status;
    });
  }, [users, initialUsers]);

  const hasChanges = changedUsers.length > 0;

  const dirty = useMemo(() => {
    const map: Record<number, boolean> = {};
    for (const u of users) {
      const original = initialUsers.find((item) => item.ID === u.ID);
      map[u.ID] = !!(original && u.status !== original.status);
    }
    return map;
  }, [users, initialUsers]);

  useEffect(() => {
    batch?.setPendingCount(changedUsers.length);
  }, [batch, changedUsers.length]);

  useEffect(() => {
    return () => batch?.setPendingCount(0);
  }, [batch]);

  const handleStatusChange = (id: number, newStatus: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.ID === id ? { ...u, status: newStatus } : u))
    );
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      const promises = changedUsers.map((u) =>
        fetch(`${process.env.NEXT_PUBLIC_CLIENT_API_URL}/v1/admin/users/${u.ID}/status`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ status: u.status }),
        })
      );

      await Promise.all(promises);
      toast.success(`Updated ${changedUsers.length} users successfully!`);

      window.location.reload();
    } catch (e) {
      toast.error("Failed to update some users");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <Suspense
        fallback={
          <div className="mb-6 h-10 w-full max-w-lg animate-pulse rounded-2xl bg-neutral-100" />
        }
      >
        <AdminUnifiedToolbar
          hasDirtyHighlight
          batchActions={{
            hasChanges,
            isSaving,
            onSave: handleSaveAll,
            onReset: () => setUsers(initialUsers),
          }}
        >
          <AdminUsersFilters />
        </AdminUnifiedToolbar>
      </Suspense>

      <AdminUserTable
        users={users}
        dirty={dirty}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}
