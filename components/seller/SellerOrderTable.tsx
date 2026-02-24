import { SellerOrder } from '@/types/sellerOrder'
import Link from 'next/link' // 💡 นำเข้า Link จาก Next.js

interface sellerOrderProps {
    recentOrders: SellerOrder[]
} 

export default function SellerOrderTable({ recentOrders }: sellerOrderProps) {
    return (
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    {/* 1. เพิ่มหัวคอลัมน์ Action */}
                    <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{order.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.product}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {order.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                ${order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                                'bg-yellow-100 text-yellow-800'}`}>
                                {order.status}
                            </span>
                        </td>
                        {/* 2. เพิ่มคอลัมน์ปุ่ม Action */}
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            {/* 💡 ใช้ Link คลุมตกแต่งให้เหมือนปุ่ม */}
                            <Link 
                                href={`/seller/orders/${order.id}`}
                                className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-md transition-colors"
                            >
                                View Details
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}