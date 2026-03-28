import { cookies } from "next/headers";
import AdminOrdersClient from "./_components/AdminOrderClient";

export default async function AdminOrdersPage() {
  const cookieStore = await cookies();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/admin/orders`, {
    headers: { 
      Cookie: cookieStore.toString(), 
      "Content-Type": "application/json" 
    },
    cache: "no-store",
  });
  
  const payload = await res.json().catch(() => null);
  const orders = payload?.data ?? [];

  // ส่งแค่ Data ไปให้ Client Component จัดการต่อ
  return <AdminOrdersClient initialOrders={orders} />;
}