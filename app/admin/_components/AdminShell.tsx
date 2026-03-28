"use client";

import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { AdminBatchPendingProvider } from "./AdminBatchPendingContext";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <AdminBatchPendingProvider>
      <div className="flex h-screen bg-neutral-50 font-sans">
        <AdminSidebar />
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto p-8">{children}</main>
        </div>
      </div>
    </AdminBatchPendingProvider>
  );
}
