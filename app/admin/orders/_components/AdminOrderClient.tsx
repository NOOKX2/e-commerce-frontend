"use client";

import BaseOrderTable from "@/components/dashboard/BaseOrderTable";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function AdminOrdersClient({ initialOrders }: { initialOrders: any[] }) {
  // ย้าย adminColumns มาไว้ใน "use client" จะทำให้ใช้ render function ได้ปกติครับ
  const adminColumns = [
    { 
      header: "Order ID", 
      key: "ID", 
      render: (o: any) => <span className="font-mono font-bold text-slate-500 text-xs">#{o.ID}</span> 
    },
    { 
      header: "Date", 
      key: "createdAt", 
      render: (o: any) => <span>{o.createdAt ? new Date(o.createdAt).toLocaleDateString('en-GB') : "-"}</span>
    },
    { 
      header: "Buyer", 
      key: "shippingReceiverName", 
      render: (o: any) => <span className="font-bold text-slate-900">{o.shippingReceiverName || "Guest User"}</span> 
    },
    { 
      header: "Seller", 
      key: "seller", 
      render: (o: any) => (
        <span className="inline-flex items-center text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-xl text-[10px] uppercase tracking-wider border border-blue-100">
          {o.items?.[0]?.product?.seller?.name || "Official Store"}
        </span>
      ) 
    },
    { 
      header: "Total", 
      key: "totalAmount", 
      render: (o: any) => <span className="font-black text-slate-900">${o.totalAmount?.toLocaleString()}</span> 
    },
    { 
      header: "Status", 
      key: "status", 
      render: (o: any) => (
        <span className={cn(
          "inline-flex rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest shadow-sm border",
          (o.status === "complete" || o.status === "Completed") ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100"
        )}>
          {o.status || "Pending"}
        </span>
      ) 
    },
    { 
      header: "Action", 
      key: "action", 
      align: 'right' as const,
      render: (o: any) => (
        <Link href={`/admin/orders/${o.ID}`} className="inline-flex items-center justify-center h-8 px-4 font-black text-blue-600 hover:bg-blue-50 rounded-xl text-[10px] uppercase tracking-tighter border border-transparent hover:border-blue-100">
          View Details
        </Link>
      ) 
    },
  ];

  return (
    <div className="space-y-8 p-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Orders</h1>
        <p className="text-sm font-medium text-slate-500">Global order monitoring and detail inspection.</p>
      </div>
      
      <div className="relative group">
        <div className="absolute -inset-1 bg-linear-to-r from-blue-100 to-indigo-100 rounded-4xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
        <div className="relative">
            <BaseOrderTable orders={initialOrders} columns={adminColumns} role="admin" />
        </div>
      </div>
    </div>
  );
}