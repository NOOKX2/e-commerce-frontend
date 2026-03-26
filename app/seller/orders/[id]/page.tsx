import Link from 'next/link';
import Image from 'next/image';
import {
    ArrowLeft,
    CheckCircle2,
    Clock,
    Package,
    Download,
    Truck,
    User,
    Mail,
    Phone,
} from 'lucide-react';
import { cookies } from 'next/headers';
import { Button } from '@/components/ui/button';

interface SellerOrderDetailResponse {
    orderId: string;
    status: string;
    placedAt: string;
    customerInfo: {
        name: string;
        email: string;
        phoneNumber: string;
    };
    shippingAddress: { addressLine: string };
    items: Array<{
        productId: string;
        name: string;
        sku: string;
        imageUrl: string;
        price: number;
        quantity: number;
        total: number;
    }>;
    sellerSubtotal: number;
}

async function getOrderDetails(id: string): Promise<SellerOrderDetailResponse | null> {
    const cookieStore = await cookies();
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/seller/orders/${id}`, {
            headers: { Cookie: cookieStore.toString() },
            cache: 'no-store',
        });

        if (!res.ok) return null;
        const json = await res.json();
        return json.data;
    } catch (error) {
        console.error("Error fetching order details:", error);
        return null;
    }
}

const formatMoney = (amount: number) =>
    amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

export default async function OrderDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = await params;
    const order = await getOrderDetails(resolvedParams.id);

    if (!order) {
        return (
            <div className="mx-auto max-w-lg rounded-3xl bg-white px-6 py-12 text-center shadow-sm">
                <p className="font-medium text-red-600">Order not found or failed to load.</p>
            </div>
        );
    }

    const statusColors: Record<string, string> = {
        Completed: 'bg-green-100 text-green-800',
        Processing: 'bg-blue-100 text-blue-800',
        Pending: 'bg-amber-100 text-amber-800',
        Cancelled: 'bg-red-100 text-red-800',
    };
    const badgeColor = statusColors[order.status] || 'bg-neutral-100 text-neutral-800';

    return (
        <div className="mx-auto max-w-7xl space-y-8">
            <div className="flex flex-col gap-4">
                <Button variant="ghost" className="h-9 w-fit rounded-full px-0 font-medium text-neutral-600 hover:text-slate-900" asChild>
                    <Link href="/seller/orders" className="inline-flex items-center gap-1.5">
                        <ArrowLeft className="h-4 w-4" />
                        Orders
                    </Link>
                </Button>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex flex-wrap items-center gap-3">
                            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                                Order #{order.orderId}
                            </h1>
                            <span
                                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold ${badgeColor}`}
                            >
                                {order.status === 'Completed' && (
                                    <CheckCircle2 className="h-4 w-4" />
                                )}
                                {order.status}
                            </span>
                        </div>
                        <p className="mt-2 flex items-center text-sm text-neutral-500">
                            <Clock className="mr-1.5 h-4 w-4" />
                            Placed on {order.placedAt}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
                <div className="flex flex-col gap-6 lg:col-span-2">
                    <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
                        <div className="px-8 py-6">
                            <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                                Items purchased from you
                            </h2>
                        </div>
                        <ul className="divide-y divide-neutral-100">
                            {order.items.map((item) => (
                                <li
                                    key={item.productId}
                                    className="flex flex-col gap-4 px-8 py-6 sm:flex-row sm:items-start"
                                >
                                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-neutral-100">
                                        {item.imageUrl ? (
                                            <Image
                                                src={item.imageUrl}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <Package className="mx-auto mt-7 h-10 w-10 text-neutral-400" />
                                        )}
                                    </div>
                                    <div className="flex min-w-0 flex-1 flex-col justify-between gap-4 sm:flex-row">
                                        <div>
                                            <h3 className="font-medium text-slate-900">{item.name}</h3>
                                            <p className="mt-1 text-sm text-neutral-500">SKU: {item.sku}</p>
                                        </div>
                                        <div className="flex flex-col gap-1 text-right sm:text-right">
                                            <p className="text-sm text-neutral-500">
                                                {formatMoney(item.price)} × {item.quantity}
                                            </p>
                                            <p className="text-base font-semibold text-slate-900">
                                                {formatMoney(item.total)}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <div className="rounded-3xl bg-white p-8 shadow-sm sm:p-9">
                        <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                            Customer &amp; shipping
                        </h2>
                        <div className="mt-6 flex gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-neutral-100">
                                <User className="h-6 w-6 text-neutral-500" />
                            </div>
                            <div className="min-w-0">
                                <p className="font-medium text-slate-900">
                                    {order.customerInfo?.name || 'Unknown Customer'}
                                </p>
                                {order.customerInfo?.email && (
                                    <p className="mt-1 flex items-center text-sm text-neutral-500">
                                        <Mail className="mr-1.5 h-3.5 w-3.5 shrink-0" />
                                        {order.customerInfo.email}
                                    </p>
                                )}
                                {order.customerInfo?.phoneNumber && (
                                    <p className="mt-1 flex items-center text-sm text-neutral-500">
                                        <Phone className="mr-1.5 h-3.5 w-3.5 shrink-0" />
                                        {order.customerInfo.phoneNumber}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="mt-8 flex gap-3">
                            <Truck className="mt-0.5 h-5 w-5 shrink-0 text-neutral-400" />
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                                    Shipping address
                                </p>
                                <p className="mt-1 text-sm font-medium leading-relaxed text-slate-900">
                                    {order.shippingAddress.addressLine}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl bg-white p-8 shadow-sm sm:p-9">
                        <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                            Your earnings
                        </h2>
                        <div className="mt-6 space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-neutral-500">Subtotal (your items)</span>
                                <span className="font-medium tabular-nums text-slate-900">
                                    {formatMoney(order.sellerSubtotal)}
                                </span>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-between border-t border-neutral-100 pt-6">
                            <span className="text-base font-bold text-slate-900">Your total</span>
                            <span className="text-xl font-bold tabular-nums text-slate-900">
                                {formatMoney(order.sellerSubtotal)}
                            </span>
                        </div>
                        <div className="mt-6 flex flex-col gap-3">
                            <Button
                                type="button"
                                className="h-11 w-full rounded-2xl bg-blue-600 text-white shadow-sm hover:bg-blue-700"
                            >
                                <Truck className="mr-2 h-4 w-4" />
                                Track package
                            </Button>
                            <Button
                                type="button"
                                variant="secondary"
                                className="h-11 w-full rounded-2xl bg-neutral-100 font-medium text-slate-900 shadow-none hover:bg-neutral-200/80"
                            >
                                <Download className="mr-2 h-4 w-4" />
                                Download invoice
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
