import { cookies } from "next/headers";
import { DollarSign, Package, ShoppingBag, Users, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/dashboard/StatCard";
import StatGroup from "@/components/dashboard/StatGroup";

// 1. Types Definition
type AdminDashboardResponse = {
  success: boolean;
  data?: {
    platformGMV: number;
    totalOrders: number;
    totalUsers: number;
    totalSellers: number;
    totalProducts: number;
    recentOrders: Array<{
      id: number;
      user: string;
      amount: number;
      status: string;
      date: string;
    }>;
  };
  error?: string;
};

// 2. Helper Functions
function formatMoney(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(amount ?? 0);
}

// 3. Main Page Component
export default async function AdminPage() {
  const cookieStore = await cookies();
  
  // Fetch data from Go Backend
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/admin/dashboard`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  const payload = (await res.json().catch(() => null)) as AdminDashboardResponse | null;
  const data = payload?.data;

  return (
    <div className="mx-auto max-w-7xl space-y-8 pb-12">
      {/* Header Section */}
      <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Admin Dashboard</h1>
          <p className="text-sm font-medium text-slate-500">
            Platform-wide overview and master control.
          </p>
        </div>
        <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-2xl" asChild>
                <Link href="/admin/reports">Generate Report</Link>
            </Button>
        </div>
      </header>

      {/* Error Alert (If API Fails) */}
      {!res.ok && (
        <div className="rounded-3xl border border-red-100 bg-red-50 p-5 text-sm text-red-700 shadow-sm flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
          {payload?.error ?? "Unable to connect to the backend server. Please check your Go API."}
        </div>
      )}

      {/* Stats Grid Section */}
      <StatGroup columns={5}>
        <StatCard 
          label="Platform GMV" 
          value={formatMoney(data?.platformGMV ?? 0)} 
          icon={DollarSign} 
          accent="green" 
        />
        <StatCard 
          label="Total Orders" 
          value={data?.totalOrders ?? 0} 
          icon={ShoppingBag} 
          accent="blue" 
        />
        <StatCard 
          label="Total Users" 
          value={data?.totalUsers ?? 0} 
          icon={Users} 
          accent="purple" 
        />
        <StatCard 
          label="Total Sellers" 
          value={data?.totalSellers ?? 0} 
          icon={TrendingUp} 
          accent="indigo" 
        />
        <StatCard 
          label="Total Products" 
          value={data?.totalProducts ?? 0} 
          icon={Package} 
          accent="pink" 
        />
      </StatGroup>

      {/* Recent Orders Table Section */}
      <section className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-50 px-8 py-6">
          <h2 className="text-lg font-bold text-slate-900">Recent Platform Orders</h2>
          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl" asChild>
            <Link href="/admin/orders" className="flex items-center gap-2">
              View all orders <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50/50 text-xs font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-8 py-4">Order ID</th>
                <th className="px-8 py-4">Customer</th>
                <th className="px-8 py-4">Amount</th>
                <th className="px-8 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {(data?.recentOrders ?? []).map((order) => (
                <tr key={order.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-5 font-mono font-bold text-slate-900">#{order.id}</td>
                  <td className="px-8 py-5">
                    <div className="font-semibold text-slate-700">{order.user}</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-tighter">Verified Buyer</div>
                  </td>
                  <td className="px-8 py-5 font-bold text-slate-900">
                    {formatMoney(order.amount)}
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex justify-center">
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider
                            ${order.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 
                              order.status === 'pending' ? 'bg-amber-100 text-amber-700' : 
                              'bg-slate-100 text-slate-600'}`}>
                            {order.status}
                        </span>
                    </div>
                  </td>
                </tr>
              ))}

              {res.ok && (data?.recentOrders?.length ?? 0) === 0 && (
                <tr>
                  <td className="px-8 py-12 text-center text-slate-400" colSpan={4}>
                    <div className="flex flex-col items-center gap-2">
                        <ShoppingBag className="h-8 w-8 text-slate-200" />
                        <p>No transactions recorded in the last 24 hours.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}