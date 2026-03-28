import { cookies } from "next/headers";
import Link from "next/link";
import { DollarSign, ShoppingBag, Users, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import StatCard from "@/components/dashboard/StatCard";
import StatGroup from "@/components/dashboard/StatGroup";
import SellerOrderTable from "@/app/seller/orders/_components/SellerOrderTable";

async function getDashboardSummary() {
    const cookieStore = await cookies();
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/seller`, {
            headers: { Cookie: cookieStore.toString() },
            cache: "no-store",
        });

        if (!res.ok) throw new Error("Failed to fetch seller data");
        const json = await res.json();
        return json.data;
    } catch (error) {
        console.error("Fetch dashboard error:", error);
        return null;
    }
}

export default async function SellerDashboard() {
    const data = await getDashboardSummary();

    // Helper สำหรับจัดรูปแบบเงิน
    const formatCurrency = (val: number) => 
        `$${Number(val ?? 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}`;

    return (
        <div className="mx-auto max-w-7xl space-y-8 pb-10">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                    Dashboard
                </h1>
                <p className="mt-2 text-sm font-medium text-neutral-500">
                    Overview of your store&apos;s performance.
                </p>
            </div>

            {/* Stats Section - ใช้ Shared Component แทน SellerStats เดิม */}
            <StatGroup columns={4}>
                <StatCard 
                    label="Total Revenue"
                    value={formatCurrency(data?.totalRevenue)}
                    subtext="+20.1% from last month"
                    icon={DollarSign}
                    accent="blue"
                />
                <StatCard 
                    label="Active Orders"
                    value={data?.activeOrders ?? 0}
                    subtext="Orders in progress"
                    icon={ShoppingBag}
                    accent="indigo"
                />
                <StatCard 
                    label="Total Customers"
                    value={data?.newCustomers ?? 0}
                    subtext="Unique customers"
                    icon={Users}
                    accent="purple"
                />
                <StatCard 
                    label="Avg. Order Value"
                    value={data?.totalRevenue > 0 
                        ? formatCurrency(data.totalRevenue / (data.activeOrders || 1))
                        : "$0.00"
                    }
                    subtext="Average per active order"
                    icon={TrendingUp}
                    accent="emerald"
                />
            </StatGroup>

            {/* Recent Orders Table */}
            <div className="overflow-hidden rounded-3xl bg-white border border-slate-100 shadow-sm">
                <div className="flex flex-col gap-3 px-8 py-6 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-lg font-bold tracking-tight text-slate-900">
                        Recent Orders
                    </h2>
                    <Button 
                        variant="ghost" 
                        className="h-9 w-fit rounded-full px-4 font-bold text-blue-600 hover:bg-blue-50 hover:text-blue-700" 
                        asChild
                    >
                        <Link href="/seller/orders" className="flex items-center gap-2">
                            View all <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </div>
                <div className="overflow-x-auto">
                    <SellerOrderTable recentOrders={data?.recentOrders || []} />
                </div>
            </div>
        </div>
    );
}