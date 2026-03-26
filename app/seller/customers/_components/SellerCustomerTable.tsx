import { cn } from "@/lib/utils";
import { Customer } from "@/types/customer";
import { Mail, MapPin } from "lucide-react";
import Link from "next/link";

interface SellerCustomerTableProps {
    customers: Customer[];
}

function SellerCustomerTable({ customers }: SellerCustomerTableProps) {
    return (
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="text-left text-xs font-semibold uppercase tracking-wider text-neutral-400">
                            <th scope="col" className="px-8 py-4">Customer</th>
                            <th scope="col" className="px-8 py-4">Contact</th>
                            <th scope="col" className="px-8 py-4">Status</th>
                            <th scope="col" className="px-8 py-4">Orders</th>
                            <th scope="col" className="px-8 py-4">Total spent</th>
                            <th scope="col" className="px-8 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                        {customers.map((customer) => (
                            <tr
                                key={customer.id}
                                className="transition-colors hover:bg-neutral-50/80"
                            >
                                <td className="whitespace-nowrap px-8 py-5">
                                    <div className="flex items-center">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-sm font-semibold text-neutral-700">
                                            {customer.name.charAt(0)}
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-slate-900">
                                                {customer.name}
                                            </div>
                                            <div className="mt-0.5 flex items-center gap-1 text-sm text-neutral-500">
                                                <MapPin className="h-3 w-3 shrink-0" />
                                                {customer.location}
                                            </div>
                                        </div>

                                    </div>
                                </td>
                                <td className="whitespace-nowrap px-8 py-5">
                                    <div className="flex items-center text-sm text-neutral-500">
                                        <Mail className="mr-2 h-4 w-4 shrink-0 text-neutral-400" />
                                        {customer.email}
                                    </div>
                                </td>
                                <td className="whitespace-nowrap px-8 py-5">
                                    <span
                                        className={cn(
                                            "inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold",
                                            customer.status === 'Active'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-700'
                                        )}
                                    >
                                        {customer.status}
                                    </span>
                                </td>
                                <td className="whitespace-nowrap px-8 py-5 text-sm text-neutral-500">
                                    {customer.totalOrders} orders
                                </td>
                                <td className="whitespace-nowrap px-8 py-5 text-sm font-medium tabular-nums text-slate-900">
                                    {customer.totalSpent.toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    })}
                                </td>
                                <td className="whitespace-nowrap px-8 py-5 text-right text-sm">
                                    <Link
                                        href={`/seller/customers/${customer.id}`}
                                        className="font-medium text-blue-600 underline-offset-4 hover:text-blue-700 hover:underline"
                                    >
                                        View
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SellerCustomerTable
