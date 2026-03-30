import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Mail,
  Package,
  Phone,
  Truck,
  User,
} from "lucide-react";
import { cookies } from "next/headers";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import AdminOrderStatusControl from "@/app/admin/orders/[id]/_components/AdminOrderStatusControl";

type AdminOrder = {
  ID: number;
  status: string;
  totalAmount: number;
  createdAt?: string;
  shippingReceiverName: string;
  shippingEmail: string;
  shippingPhoneNumber: string;
  shippingStreetAddress: string;
  shippingSubDistrict: string;
  shippingDistrict: string;
  shippingProvince: string;
  shippingPostalCode: string;
  items: Array<{
    ID: number;
    quantity: number;
    priceAtPurchase: number;
    product: {
      name: string;
      sku?: string;
      imageUrl?: string;
      seller?: { name?: string };
    };
  }>;
};

type Response = { success: boolean; data?: AdminOrder; error?: string };

const formatMoney = (amount: number) =>
  amount.toLocaleString("en-US", { style: "currency", currency: "USD" });

function formatPlacedAt(iso?: string) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cookieStore = await cookies();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/admin/orders/${id}`, {
    headers: { Cookie: cookieStore.toString(), "Content-Type": "application/json" },
    cache: "no-store",
  });
  if (res.status === 404) notFound();
  const payload = (await res.json().catch(() => null)) as Response | null;
  const order = payload?.data;
  if (!order) notFound();

  const statusKey = order.status?.trim() || "";
  const statusColors: Record<string, string> = {
    Completed: "bg-green-100 text-green-800",
    complete: "bg-green-100 text-green-800",
    Processing: "bg-blue-100 text-blue-800",
    processing: "bg-blue-100 text-blue-800",
    Pending: "bg-amber-100 text-amber-800",
    pending: "bg-amber-100 text-amber-800",
    Cancelled: "bg-red-100 text-red-800",
    cancelled: "bg-red-100 text-red-800",
  };
  const badgeColor = statusColors[statusKey] ?? "bg-neutral-100 text-neutral-800";

  const addressLine = [
    order.shippingStreetAddress,
    order.shippingSubDistrict,
    order.shippingDistrict,
    order.shippingProvince,
    order.shippingPostalCode,
  ]
    .filter(Boolean)
    .join(", ");

  const itemsSubtotal = order.items?.reduce(
    (sum, item) => sum + item.priceAtPurchase * item.quantity,
    0
  ) ?? 0;
  return (
    <div className="mx-auto max-w-7xl space-y-8 pb-12">
      {/* ... Header ส่วนบนเหมือนเดิม ... */}
      <div className="flex flex-col gap-4">
        <Button variant="ghost" className="h-9 w-fit rounded-full px-0 font-medium text-neutral-600 hover:text-slate-900" asChild>
          <Link href="/admin/orders" className="inline-flex items-center gap-1.5">
            <ArrowLeft className="h-4 w-4" /> Orders
          </Link>
        </Button>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Order #{order.ID}</h1>
              <span className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold", badgeColor)}>
                {(statusKey.toLowerCase() === "completed" || statusKey === "Completed") && <CheckCircle2 className="h-4 w-4" />}
                {order.status}
              </span>
            </div>
            <p className="mt-2 flex items-center text-sm text-neutral-500">
              <Clock className="mr-1.5 h-4 w-4 shrink-0" />
              Placed on {formatPlacedAt(order.createdAt)}
            </p>
          </div>
        </div>
      </div>

      {/* ⬇️ ปรับ Layout ตรงนี้ ⬇️ */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">

        {/* ฝั่งซ้าย (กินพื้นที่ 2 ส่วน): Order Items + Order Summary */}
        <div className="flex flex-col gap-6 lg:col-span-2">

          {/* Card 1: Order Items */}
          <div className="overflow-hidden rounded-3xl bg-white shadow-sm border border-slate-100">
            <div className="px-8 py-6 border-b border-slate-50">
              <h2 className="text-lg font-semibold tracking-tight text-slate-900">Order items</h2>
            </div>
            <ul className="divide-y divide-neutral-100">
              {order.items?.map((item) => (
                <li key={item.ID} className="flex flex-col gap-4 px-8 py-6 sm:flex-row sm:items-start">
                  {/* ... โค้ดแสดง Item เหมือนเดิม ... */}
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-neutral-100">
                    {item.product?.imageUrl ? (
                      <Image src={item.product.imageUrl} alt={item.product.name} fill className="object-cover" unoptimized />
                    ) : (
                      <Package className="mx-auto mt-7 h-10 w-10 text-neutral-400" />
                    )}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-between gap-4 sm:flex-row">
                    <div>
                      <h3 className="font-medium text-slate-900">{item.product?.name ?? "Product"}</h3>
                      <p className="mt-1 text-sm text-neutral-500">SKU: {item.product?.sku ?? "—"}</p>
                      {item.product?.seller?.name && (
                        <p className="mt-1 inline-flex rounded-lg border border-blue-100 bg-blue-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-600">
                          Seller: {item.product.seller.name}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 text-right sm:text-right">
                      <p className="text-sm text-neutral-500">{formatMoney(item.priceAtPurchase)} × {item.quantity}</p>
                      <p className="text-base font-semibold text-slate-900">{formatMoney(item.priceAtPurchase * item.quantity)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2: ย้าย Order Summary มาต่อท้าย Order Items ทางฝั่งซ้าย */}
          <div className="rounded-3xl bg-white p-8 shadow-sm sm:p-9 border border-slate-100">
            <h2 className="text-lg font-semibold tracking-tight text-slate-900">Order summary</h2>
            <div className="mt-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Items subtotal</span>
                <span className="font-medium tabular-nums text-slate-900">{formatMoney(itemsSubtotal)}</span>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-neutral-100 pt-6">
              <span className="text-base font-bold text-slate-900">Total</span>
              <span className="text-2xl font-black tabular-nums text-slate-900">{formatMoney(order.totalAmount)}</span>
            </div>
          </div>
        </div>

        {/* ฝั่งขวา (กินพื้นที่ 1 ส่วน): Status + Customer & Shipping + Action Buttons */}
        <div className="flex flex-col gap-6 lg:col-span-1">

          <AdminOrderStatusControl orderId={order.ID} initialStatus={order.status} />

          {/* Card 3: Customer & Shipping */}
          <div className="rounded-3xl bg-white p-8 shadow-sm sm:p-9 border border-slate-100">
            <h2 className="text-lg font-semibold tracking-tight text-slate-900">Customer &amp; shipping</h2>
            <div className="mt-6 flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-neutral-100">
                <User className="h-6 w-6 text-neutral-500" />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-slate-900">{order.shippingReceiverName || "Unknown customer"}</p>
                {order.shippingEmail && (
                  <p className="mt-1 flex items-center text-sm text-neutral-500">
                    <Mail className="mr-1.5 h-3.5 w-3.5 shrink-0" /> {order.shippingEmail}
                  </p>
                )}
                {order.shippingPhoneNumber && (
                  <p className="mt-1 flex items-center text-sm text-neutral-500">
                    <Phone className="mr-1.5 h-3.5 w-3.5 shrink-0" /> {order.shippingPhoneNumber}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-8 flex gap-3">
              <Truck className="mt-0.5 h-5 w-5 shrink-0 text-neutral-400" />
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">Shipping address</p>
                <p className="mt-1 text-sm font-medium leading-relaxed text-slate-900">{addressLine || "—"}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
