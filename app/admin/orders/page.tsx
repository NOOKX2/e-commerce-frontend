import Link from "next/link";
import { cookies } from "next/headers";

type AdminOrder = {
  ID: number;
  createdAt: string;
  shippingReceiverName: string;
  totalAmount: number;
  status: string;
  items?: Array<{ product?: { seller?: { name?: string } } }>;
};

type Response = { success: boolean; data?: AdminOrder[]; error?: string };

export default async function AdminOrdersPage() {
  const cookieStore = await cookies();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/admin/orders`, {
    headers: { Cookie: cookieStore.toString(), "Content-Type": "application/json" },
    cache: "no-store",
  });
  const payload = (await res.json().catch(() => null)) as Response | null;
  const orders = payload?.data ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <p className="mt-1 text-sm text-gray-500">Global order monitoring and detail inspection.</p>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-xs">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium">
            <tr>
              <th className="px-6 py-3">Order ID</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Buyer</th>
              <th className="px-6 py-3">Seller</th>
              <th className="px-6 py-3">Total</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((o) => (
              <tr key={o.ID}>
                <td className="px-6 py-4">#{o.ID}</td>
                <td className="px-6 py-4">{o.createdAt ? new Date(o.createdAt).toLocaleDateString() : "-"}</td>
                <td className="px-6 py-4">{o.shippingReceiverName}</td>
                <td className="px-6 py-4">{o.items?.[0]?.product?.seller?.name ?? "-"}</td>
                <td className="px-6 py-4">${o.totalAmount?.toFixed(2)}</td>
                <td className="px-6 py-4">{o.status}</td>
                <td className="px-6 py-4 text-right">
                  <Link className="text-sm text-blue-600 hover:text-blue-700" href={`/admin/orders/${o.ID}`}>
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

