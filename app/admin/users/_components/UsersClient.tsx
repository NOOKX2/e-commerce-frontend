"use client";

import { useState, useMemo } from "react";
import toast from "react-hot-toast";
import { AdminUser } from "@/types/user";
import AdminUserTable from "@/app/admin/users/_components/AdminUserTable";
import BatchActionBar from "@/components/dashboard/BatchActionBar";

export default function UsersClient({ initialUsers }: { initialUsers: AdminUser[] }) {
  const [users, setUsers] = useState(initialUsers);
  const [isSaving, setIsSaving] = useState(false);

  // 1. คำนวณหาว่า User คนไหนถูกเปลี่ยน Status บ้าง
  const changedUsers = useMemo(() => {
    return users.filter((u) => {
      const original = initialUsers.find((item) => item.ID === u.ID);
      return original && u.status !== original.status;
    });
  }, [users, initialUsers]);

  const hasChanges = changedUsers.length > 0;

  // 2. ฟังก์ชันอัปเดต State เมื่อเลือก Dropdown ในตาราง
  const handleStatusChange = (id: number, newStatus: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.ID === id ? { ...u, status: newStatus } : u))
    );
  };

  // 3. ฟังก์ชัน Save All (ยิง API แบบ Batch)
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
      
      // Refresh หน้าเพื่อรีเซ็ต initial state
      window.location.reload(); 
    } catch (e) {
      toast.error("Failed to update some users");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* เรียกใช้ BatchActionBar ที่เพิ่งสร้างมา */}
      <BatchActionBar 
        hasChanges={hasChanges}
        changedCount={changedUsers.length}
        isSaving={isSaving}
        onSave={handleSaveAll}
        onReset={() => setUsers(initialUsers)}
        title="User Management"
        subTitle="Moderate user access and status across the platform"
      />

      <AdminUserTable
        users={users}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}