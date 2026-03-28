"use client";

import AdminSearchParamInput from "@/components/dashboard/AdminSearchParamInput";

/** Search orders by ID, buyer, or seller (URL: `search`, client-side filter). */
export default function AdminOrdersFilters() {
  return (
    <div className="flex w-full min-w-0 flex-col gap-3 sm:flex-1 sm:flex-row sm:items-center sm:gap-4">
      <AdminSearchParamInput placeholder="Search by order ID, buyer, or seller..." />
    </div>
  );
}
