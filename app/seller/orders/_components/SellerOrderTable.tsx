import { SellerOrder } from '@/types/sellerOrder'
import Link from 'next/link'

interface sellerOrderProps {
    recentOrders: SellerOrder[]
}

export default function SellerOrderTable({ recentOrders }: sellerOrderProps) {
    return (
        <table className="min-w-full">
            <thead>
                <tr className="text-left text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    <th scope="col" className="px-8 py-4">Order ID</th>
                    <th scope="col" className="px-8 py-4">Product</th>
                    <th scope="col" className="px-8 py-4">Customer</th>
                    <th scope="col" className="px-8 py-4">Date</th>
                    <th scope="col" className="px-8 py-4">Amount</th>
                    <th scope="col" className="px-8 py-4">Status</th>
                    <th scope="col" className="relative px-8 py-4">
                        <span className="sr-only">Actions</span>
                    </th>
                </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
                {recentOrders.map((order) => (
                    <tr key={order.id} className="transition-colors hover:bg-neutral-50/80">
                        <td className="whitespace-nowrap px-8 py-5 text-sm font-medium tabular-nums text-neutral-600">
                            {order.id}
                        </td>
                        <td className="whitespace-nowrap px-8 py-5 text-sm font-medium text-slate-900">
                            {order.product}
                        </td>
                        <td className="whitespace-nowrap px-8 py-5 text-sm text-neutral-500">
                            {order.customer}
                        </td>
                        <td className="whitespace-nowrap px-8 py-5 text-sm text-neutral-500">
                            {order.date}
                        </td>
                        <td className="whitespace-nowrap px-8 py-5 text-sm font-medium tabular-nums text-slate-900">
                            {order.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                        </td>
                        <td className="whitespace-nowrap px-8 py-5">
                            <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold
                                ${order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                                'bg-amber-100 text-amber-800'}`}>
                                {order.status}
                            </span>
                        </td>
                        <td className="whitespace-nowrap px-8 py-5 text-right text-sm">
                            <Link
                                href={`/seller/orders/${order.id}`}
                                className="font-medium text-blue-600 underline-offset-4 hover:text-blue-700 hover:underline"
                            >
                                View
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
