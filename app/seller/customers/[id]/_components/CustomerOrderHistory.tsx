import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

export interface CustomerOrder {
    orderId: string;
    date: string;
    total: number;
    status: string;
    itemsCount: number;
}

interface Props {
    orders: CustomerOrder[];
}

export default function CustomerOrderHistory({ orders }: Props) {
    return (
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
            <div className="flex flex-col gap-1 px-8 py-6 sm:flex-row sm:items-center sm:justify-between sm:py-7">
                <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                    Order history
                </h2>
                <span className="text-sm text-neutral-500">
                    {orders?.length || 0} orders
                </span>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="text-left text-xs font-semibold uppercase tracking-wider text-neutral-400">
                            <th className="px-8 py-4">Order ID</th>
                            <th className="px-8 py-4">Date</th>
                            <th className="px-8 py-4">Items</th>
                            <th className="px-8 py-4 text-right">Total</th>
                            <th className="px-8 py-4 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                        {orders && orders.length > 0 ? (
                            orders.map((order) => (
                                <tr
                                    key={order.orderId}
                                    className="transition-colors hover:bg-neutral-50/80"
                                >
                                    <td className="whitespace-nowrap px-8 py-5 text-sm font-medium text-neutral-600">
                                        <Link
                                            href={`/seller/orders/${order.orderId}`}
                                            className="text-blue-600 underline-offset-4 hover:text-blue-700 hover:underline"
                                        >
                                            {order.orderId}
                                        </Link>
                                    </td>
                                    <td className="whitespace-nowrap px-8 py-5 text-sm text-neutral-500">
                                        {order.date}
                                    </td>
                                    <td className="whitespace-nowrap px-8 py-5 text-sm text-neutral-500">
                                        <div className="flex items-center">
                                            <ShoppingBag className="mr-1.5 h-4 w-4 text-neutral-400" />
                                            {order.itemsCount} items
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-8 py-5 text-right text-sm font-medium tabular-nums text-slate-900">
                                        ${Number(order.total).toLocaleString('en-US', {
                                            minimumFractionDigits: 2,
                                        })}
                                    </td>
                                    <td className="whitespace-nowrap px-8 py-5 text-center">
                                        <span
                                            className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold
                                            ${order.status === 'Completed'
                                                ? 'bg-green-100 text-green-800'
                                                : order.status === 'Processing'
                                                  ? 'bg-blue-100 text-blue-800'
                                                  : 'bg-amber-100 text-amber-800'}`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-8 py-12 text-center text-sm text-neutral-500"
                                >
                                    No orders found for this customer.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
