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

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white overflow-hidden shadow-sm rounded-xl hover:shadow-md transition-shadow duration-200 border border-gray-100">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className={`shrink-0 rounded-lg p-3 ${stat.color} bg-opacity-10`}>
                                    <stat.icon className={`h-6 w-6 text-${stat.color.replace('bg-', '')}`} aria-hidden="true" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">{stat.label}</dt>
                                        <dd>
                                            <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-5 py-3">
                            <div className="text-xs font-medium text-green-600 truncate">
                                {stat.change}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white shadow-sm rounded-xl border border-gray-100">
                <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-500">View all</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {recentOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{order.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.product}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.amount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-yellow-100 text-yellow-800'}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
