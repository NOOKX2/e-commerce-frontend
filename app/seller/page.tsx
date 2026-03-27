import SellerOrderTable from "@/app/seller/orders/_components/SellerOrderTable";
import SellerStats from "@/app/seller/_components/SellerStat";
import { DollarSign, ShoppingBag, Users, TrendingUp } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { Button } from "@/components/ui/button";

async function getDashboardSummary() {
    const cookieStore = await cookies();

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/seller`, {
            headers: { Cookie: cookieStore.toString() },
            cache: "no-store",
        });

        if (!res.ok) {
            console.log(res);
            throw new Error("res is not ok");
        }

        const json = await res.json();
        return json.data;
    } catch (error) {
        console.error("Fetch dashboard error:", error);
        return null;
    }
}

export default async function SellerDashboard() {
    const data = await getDashboardSummary();

    const stats = [
        {
            label: "Total Revenue",
            value: data
                ? `$${Number(data.totalRevenue).toLocaleString("en-US", { minimumFractionDigits: 2 })}`
                : "$0.00",
            change: "+20.1% from last month",
            icon: DollarSign,
            accent: "blue" as const,
        },
        {
            label: "Active Orders",
            value: data?.activeOrders?.toString() || "0",
            change: "Orders in progress",
            icon: ShoppingBag,
            accent: "indigo" as const,
        },
        {
            label: "Total Customers",
            value: data?.newCustomers?.toString() || "0",
            change: "Unique customers",
            icon: Users,
            accent: "purple" as const,
        },
        {
            label: "Avg. Order Value",
            value:
                data?.totalRevenue > 0
                    ? `$${(data.totalRevenue / (data.activeOrders || 1)).toLocaleString()}`
                    : "$0.00",
            change: "Average per active order",
            icon: TrendingUp,
            accent: "emerald" as const,
        },
    ];

    return (
        <div className="mx-auto max-w-7xl space-y-8">
            <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                    Dashboard
                </h1>
                <p className="mt-2 text-sm text-neutral-500">
                    Overview of your store&apos;s performance.
                </p>
            </div>

            <SellerStats stats={stats} />

            <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
                <div className="flex flex-col gap-3 px-8 py-6 sm:flex-row sm:items-center sm:justify-between sm:py-7">
                    <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                        Recent Orders
                    </h2>
                    <Button variant="ghost" className="h-9 w-fit rounded-full px-0 font-medium text-blue-600 hover:bg-transparent hover:text-blue-700" asChild>
                        <Link href="/seller/orders">View all</Link>
                    </Button>
                </div>
                <div className="overflow-x-auto">
                    <SellerOrderTable recentOrders={data?.recentOrders || []} />
                </div>
            </div>
        </div>
    );
}
