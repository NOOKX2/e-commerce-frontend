"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AdminUser } from "@/types/user";
import Link from "next/link";
import { cn } from "@/lib/utils";

// เอา onSave และ isUpdating ออก เพราะเราใช้ Batch Action แทนแล้ว
interface AdminUserTableProps {
  users: AdminUser[];
  /** Per user ID: when true, status Select uses dirty (blue) styling */
  dirty?: Record<number, boolean>;
  onStatusChange: (id: number, status: string) => void;
}

const statuses = ["active", "suspended", "banned"];

export default function AdminUserTable({
  users,
  dirty,
  onStatusChange,
}: AdminUserTableProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead>
            {/* ปรับสไตล์ Header ให้เหมือนหน้า Product */}
            <tr className="bg-slate-50/30 text-[10px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-50">
              <th className="px-8 py-5">ID</th>
              <th className="px-8 py-5">User Info</th>
              <th className="px-8 py-5">Role</th>
              <th className="px-8 py-5">Joined Date</th>
              <th className="px-8 py-5 text-center">Status</th>
              <th className="px-8 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {users.map((u) => {
              const statusDirty = dirty?.[u.ID] ?? false;

              return (
              <tr key={u.ID} className="transition-colors hover:bg-slate-50/50 group">
                <td className="px-8 py-5 font-mono text-[10px] text-slate-400 uppercase tracking-tighter">
                  #{u.ID}
                </td>
                
                <td className="px-8 py-5">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-900">{u.name}</span>
                    <span className="text-xs text-slate-500">{u.email}</span>
                  </div>
                </td>
                
                <td className="px-8 py-5">
                  <span className="inline-flex items-center rounded-lg bg-slate-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-600 border border-slate-200">
                    {u.role}
                  </span>
                </td>
                
                <td className="px-8 py-5 text-sm text-slate-500 font-medium">
                  {u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-GB') : "-"}
                </td>
                
                <td className="px-8 py-5">
                  <div className="flex justify-center">
                    <Select
                      value={u.status}
                      onValueChange={(val) => onStatusChange(u.ID, val)}
                    >
                      <SelectTrigger
                        className={cn(
                          "w-32 h-8 rounded-xl text-[11px] font-bold uppercase border-slate-200 bg-white text-slate-800",
                          "focus:ring-2 focus:ring-slate-200/80 focus:border-slate-300",
                          "[&_svg]:opacity-50",
                          statusDirty &&
                            "border-blue-500 bg-blue-50/90 text-blue-800 shadow-sm ring-2 ring-blue-500/20 focus:border-blue-500 focus:ring-blue-500/25 [&_svg]:text-blue-600 [&_svg]:opacity-100"
                        )}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statuses.map((s) => (
                          <SelectItem key={s} value={s} className="text-[11px] font-bold uppercase">
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </td>
                
                {/* เปลี่ยนปุ่ม Save รายบรรทัดเป็นลิงก์ Details ให้เหมือน Products */}
                <td className="px-8 py-5 text-right">
                    <Link href={`/admin/users/${u.ID}`}>
                  <button className="font-bold text-blue-600 hover:underline text-[11px] uppercase tracking-wider">
                    Details
                  </button>
                  </Link>
                </td>
              </tr>
            );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}