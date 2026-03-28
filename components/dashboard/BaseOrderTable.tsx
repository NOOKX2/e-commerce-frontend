"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface OrderColumn {
    header: string;
    key: string;
    align?: "left" | "right" | "center";
    render?: (order: any) => ReactNode;
}

interface BaseOrderTableProps {
    orders: any[];
    columns: OrderColumn[];
    role: "admin" | "seller";
    footer?: ReactNode;
}

export default function BaseOrderTable({ orders, columns, role: _role, footer }: BaseOrderTableProps) {
    return (
        <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="text-left text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-50">
                            {columns.map((col) => (
                                <th 
                                    key={col.key} 
                                    className={cn("px-8 py-5", col.align === 'right' && "text-right", col.align === 'center' && "text-center")}
                                >
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {orders.map((order) => (
                            <tr key={order.id || order.ID} className="transition-colors hover:bg-slate-50/50 group">
                                {columns.map((col) => (
                                    <td 
                                        key={col.key} 
                                        className={cn(
                                            "whitespace-nowrap px-8 py-5 text-sm",
                                            col.align === 'right' && "text-right",
                                            col.align === 'center' && "text-center"
                                        )}
                                    >
                                        {col.render ? col.render(order) : order[col.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {footer}
        </div>
    );
}