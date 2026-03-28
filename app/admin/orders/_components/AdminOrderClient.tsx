"use client";

import { Suspense } from "react";

import BaseOrderTable from "@/components/dashboard/BaseOrderTable";
import AdminUnifiedToolbar from "@/components/dashboard/AdminUnifiedToolbar";
import AdminOrdersFilters from "@/app/admin/orders/_components/AdminOrdersFilters";
import AdminTablePagination, { type AdminListMeta } from "@/components/dashboard/AdminTablePagination";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function AdminOrdersClient({
  initialOrders,
  meta,
}: {
  initialOrders: any[];
  meta: AdminListMeta;
}) {
  const adminColumns = [
    {
      header: "Order ID",
      key: "ID",
      render: (o: any) => <span className="font-mono text-xs font-bold text-slate-500">#{o.ID}</span>,
    },
    {
      header: "Date",
      key: "createdAt",
      render: (o: any) => (
        <span>{o.createdAt ? new Date(o.createdAt).toLocaleDateString("en-GB") : "-"}</span>
      ),
    },
    {
      header: "Buyer",
      key: "shippingReceiverName",
      render: (o: any) => (
        <span className="text-slate-700">{o.shippingReceiverName || "Guest User"}</span>
      ),
    },
    {
      header: "Seller",
      key: "seller",
      render: (o: any) => (
        <span className="inline-flex items-center rounded-xl border border-blue-100 bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-600">
          {o.items?.[0]?.product?.seller?.name || "Official Store"}
        </span>
      ),
    },
    {
      header: "Total",
      key: "totalAmount",
      render: (o: any) => (
        <span className="font-semibold text-slate-900">${o.totalAmount?.toLocaleString()}</span>
      ),
    },
    {
      header: "Status",
      key: "status",
      render: (o: any) => (
        <span
          className={cn(
            "inline-flex rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-widest shadow-sm",
            o.status === "complete" || o.status === "Completed"
              ? "border-emerald-100 bg-emerald-50 text-emerald-600"
              : "border-amber-100 bg-amber-50 text-amber-600"
          )}
        >
          {o.status || "Pending"}
        </span>
      ),
    },
    {
      header: "Action",
      key: "action",
      align: "right" as const,
      render: (o: any) => (
        <Link
          href={`/admin/orders/${o.ID}`}
          className="inline-flex h-8 items-center justify-center rounded-xl border border-transparent px-4 text-[10px] font-black uppercase tracking-tighter text-blue-600 hover:border-blue-100 hover:bg-blue-50"
        >
          View Details
        </Link>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <Suspense
        fallback={
          <div className="mb-6 h-10 w-full max-w-lg animate-pulse rounded-2xl bg-neutral-100" />
        }
      >
        <AdminUnifiedToolbar>
          <AdminOrdersFilters />
        </AdminUnifiedToolbar>
      </Suspense>

      <div className="group relative">
        <div className="absolute -inset-1 rounded-4xl bg-linear-to-r from-blue-100 to-indigo-100 opacity-25 blur transition duration-1000 group-hover:opacity-50" />
        <div className="relative">
          <BaseOrderTable
            orders={initialOrders}
            columns={adminColumns}
            role="admin"
            footer={<AdminTablePagination meta={meta} />}
          />
        </div>
      </div>
    </div>
  );
}
