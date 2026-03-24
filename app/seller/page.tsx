import SellerOrderTable from "@/app/seller/orders/_components/SellerOrderTable";
import SellerStats from "@/app/seller/_components/SellerStat";
import { DollarSign, ShoppingBag, Users, TrendingUp } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";


async function getDashboardSummary() {
    const cookieStore = await cookies();

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/seller`, {
            headers: { 'Cookie': cookieStore.toString() },
            cache: 'no-store', // ข้อมูล Dashboard ต้องสดใหม่เสมอ
        });

        if (!res.ok) {
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
            // ใช้ Optional Chaining (?.) และให้ค่าเริ่มต้นเป็น 0 หาก data เป็น null
            value: data ? `$${Number(data.totalRevenue).toLocaleString('en-US', { minimumFractionDigits: 2 })}` : "$0.00",
            change: "+20.1% from last month", // ส่วนนี้สามารถปรับให้คำนวณจริงจาก Backend ได้ในอนาคต
            icon: DollarSign,
            color: "bg-blue-500"
        },
        {
            label: "Active Orders",
            value: data?.activeOrders?.toString() || "0",
            change: "Orders in progress",
            icon: ShoppingBag,
            color: "bg-indigo-500"
        },
        {
            label: "Total Customers",
            value: data?.newCustomers?.toString() || "0",
            change: "Unique customers",
            icon: Users,
            color: "bg-purple-500"
        },
        {
            label: "Avg. Order Value",
            // คำนวณเพิ่มเองจากหน้าบ้านเบื้องต้น
            value: data?.totalRevenue > 0
                ? `$${(data.totalRevenue / (data.activeOrders || 1)).toLocaleString()}`
                : "$0.00",
            change: "Average per active order",
            icon: TrendingUp,
            color: "bg-emerald-500"
        },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h2>
                <p className="mt-2 text-gray-600">Overview of your store's performance.</p>
            </div>

            <SellerStats stats={stats} />

            <div className="bg-white shadow-sm rounded-xl border border-gray-100">
                <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                    <Link href="/seller/orders">
                        <button className="text-sm font-medium text-blue-600 hover:text-blue-500">View all</button>
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <SellerOrderTable recentOrders={data?.recentOrders || []} />
                </div>
            </div>
        </div>
    );
}
