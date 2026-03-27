import { notFound } from "next/navigation";
import { cookies } from "next/headers";

type AdminOrder = {
  ID: number;
  status: string;
  totalAmount: number;
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
    product: { name: string; seller?: { name?: string } };
  }>;
};

type Response = { success: boolean; data?: AdminOrder; error?: string };

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Order #{order.ID}</h1>
        <p className="mt-1 text-sm text-gray-500">Status: {order.status}</p>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs">
        <h2 className="font-semibold text-gray-900">Buyer & Shipping</h2>
        <p className="mt-2 text-sm text-gray-700">{order.shippingReceiverName}</p>
        <p className="text-sm text-gray-700">{order.shippingEmail}</p>
        <p className="text-sm text-gray-700">{order.shippingPhoneNumber}</p>
        <p className="mt-2 text-sm text-gray-700">
          {order.shippingStreetAddress}, {order.shippingSubDistrict}, {order.shippingDistrict},{" "}
          {order.shippingProvince} {order.shippingPostalCode}
        </p>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs">
        <h2 className="font-semibold text-gray-900">Items</h2>
        <div className="mt-4 space-y-3">
          {order.items?.map((item) => (
            <div key={item.ID} className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <p className="font-medium text-gray-900">{item.product?.name}</p>
                <p className="text-sm text-gray-500">Seller: {item.product?.seller?.name ?? "-"}</p>
              </div>
              <div className="text-right text-sm text-gray-700">
                <p>Qty: {item.quantity}</p>
                <p>${(item.priceAtPurchase * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-right font-semibold text-gray-900">
          Total: ${order.totalAmount.toFixed(2)}
        </div>
      </div>
    </div>
  );
}

