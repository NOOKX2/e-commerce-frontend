import SellerOrderTable from "@/components/seller/order/SellerOrderTable";
import SellerStats from "@/components/seller/SellerStat";
import { DollarSign, ShoppingBag, Users, TrendingUp } from "lucide-react";

const stats = [
    {
        label: "Total Revenue",
        value: "$45,231.89",
        change: "+20.1% from last month",
        icon: DollarSign,
        color: "bg-blue-500"
    },
    {
        label: "Active Orders",
        value: "126",
        change: "+12 since last hour",
        icon: ShoppingBag,
        color: "bg-indigo-500"
    },
    {
        label: "New Customers",
        value: "48",
        change: "+4% from last month",
        icon: Users,
        color: "bg-purple-500"
    },
    {
        label: "Sales Growth",
        value: "+12.5%",
        change: "+2.1% from last month",
        icon: TrendingUp,
        color: "bg-emerald-500"
    },
];

const recentOrders = [
    { id: "#ORD-7352", product: "Wireless Headphones", customer: "Alex Morgan", date: "Oct 24, 2023", amount: "$129.00", status: "Completed" },
    { id: "#ORD-7351", product: "Smart Watch Series 7", customer: "Sarah Williams", date: "Oct 24, 2023", amount: "$399.00", status: "Processing" },
    { id: "#ORD-7350", product: "Mechanical Keyboard", customer: "Michael Brown", date: "Oct 23, 2023", amount: "$149.00", status: "Completed" },
    { id: "#ORD-7349", product: "USB-C Hub Multiport", customer: "Emily Davis", date: "Oct 23, 2023", amount: "$45.00", status: "Pending" },
    { id: "#ORD-7348", product: "Ergonomic Office Chair", customer: "David Wilson", date: "Oct 22, 2023", amount: "$299.00", status: "Processing" },
];

export default function SellerDashboard() {
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
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-500">View all</button>
                </div>
                <div className="overflow-x-auto">
                    <SellerOrderTable recentOrders={recentOrders} />
                </div>
            </div>
        </div>
    );
}
