"use client";

import { DollarSign, ShoppingBag, Users, TrendingUp } from "lucide-react";

const stats = [
    { label: "Total Revenue", value: "$45,231.89", icon: DollarSign, trend: "+20.1%", color: "text-green-600" },
    { label: "Active Orders", value: "34", icon: ShoppingBag, trend: "+12.5%", color: "text-blue-600" },
    { label: "Total Users", value: "2,331", icon: Users, trend: "+8.2%", color: "text-purple-600" },
    { label: "Growth", value: "14.2%", icon: TrendingUp, trend: "+4.3%", color: "text-pink-600" },
];

export default function AdminPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="mt-1 text-sm text-gray-500">Welcome back, Admin. Here's what's happening today.</p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.label} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                                    <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
                                </div>
                                <div className={`p-3 rounded-full bg-gray-50 ${stat.color}`}>
                                    <Icon className="h-6 w-6" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-sm">
                                <span className="text-green-600 font-medium">{stat.trend}</span>
                                <span className="ml-2 text-gray-500">from last month</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-900">Recent Transactions</h2>
                    <button className="text-sm font-medium text-purple-600 hover:text-purple-700">View all</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-500 font-medium">
                            <tr>
                                <th className="px-6 py-3">Order ID</th>
                                <th className="px-6 py-3">User</th>
                                <th className="px-6 py-3">Product</th>
                                <th className="px-6 py-3">Amount</th>
                                <th className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <tr key={i} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">#ORD-{1000 + i}</td>
                                    <td className="px-6 py-4 text-gray-600">User {i}</td>
                                    <td className="px-6 py-4 text-gray-600">Product {i}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">${(i * 120.50).toFixed(2)}</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            Completed
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
