"use client";

import SellerOrderTable from '@/components/seller/SellerOrderTable';
import { SellerOrder } from '@/types/sellerOrder';
import { Search, Filter, Download } from 'lucide-react';

const mockOrders: SellerOrder[] = [
    {
        id: "ORD-001",
        product: "Premium Wireless Headphones",
        customer: "John Doe",
        date: "2024-01-20",
        amount: "$299.99",
        status: "Completed",
    },
    {
        id: "ORD-002",
        product: "Ergonomic Office Chair",
        customer: "Jane Smith",
        date: "2024-01-19",
        amount: "$199.50",
        status: "Processing",
    },
    {
        id: "ORD-003",
        product: "Mechanical Keyboard",
        customer: "Bob Johnson",
        date: "2024-01-18",
        amount: "$129.00",
        status: "Pending",
    },
    {
        id: "ORD-004",
        product: "USB-C Hub",
        customer: "Alice Brown",
        date: "2024-01-18",
        amount: "$49.99",
        status: "Completed",
    },
    {
        id: "ORD-005",
        product: "Monitor Stand",
        customer: "Charlie Wilson",
        date: "2024-01-17",
        amount: "$79.99",
        status: "Completed",
    },
];

export default function SellerOrdersPage() {
    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
                    <p className="text-gray-500">Manage and track your customer orders.</p>
                </div>
                <button className="flex items-center justify-center px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-colors shadow-sm">
                    <Download className="h-5 w-5 mr-2" />
                    Export Orders
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <div className="relative w-full sm:w-96">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search orders..."
                        className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                    <button className="flex items-center justify-center px-4 py-2 border border-gray-200 text-gray-700 bg-white rounded-lg hover:bg-gray-50 font-medium transition-colors flex-1 sm:flex-none">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                    </button>
                </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <SellerOrderTable recentOrders={mockOrders} />
            </div>
        </div>
    );
}
