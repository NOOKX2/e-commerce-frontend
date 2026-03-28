import { Suspense } from "react";
import { cookies } from "next/headers";
import WorkspacePageHeader from "@/components/dashboard/WorkspacePageHeader";
import AdminOrdersClient from "./_components/AdminOrderClient";

export default async function AdminOrdersPage() {
  const cookieStore = await cookies();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/admin/orders`, {
    headers: {
      Cookie: cookieStore.toString(),
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const payload = await res.json().catch(() => null);
  const orders = payload?.data ?? [];

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <WorkspacePageHeader
        title="Orders"
        description="Global order monitoring and detail inspection."
      />
      <Suspense
        fallback={
          <div className="h-32 animate-pulse rounded-3xl bg-neutral-100" />
        }
      >
        <AdminOrdersClient initialOrders={orders} />
      </Suspense>
    </div>
  );
}
