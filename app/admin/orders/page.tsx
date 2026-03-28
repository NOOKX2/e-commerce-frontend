import { Suspense } from "react";
import { cookies } from "next/headers";

import { firstQueryValue, parseAdminPage } from "@/app/admin/_lib/query-params";
import WorkspacePageHeader from "@/components/dashboard/WorkspacePageHeader";
import type { AdminListMeta } from "@/components/dashboard/AdminTablePagination";
import AdminOrdersClient from "./_components/AdminOrderClient";

type Response = {
  success?: boolean;
  data?: unknown[];
  meta?: AdminListMeta & Record<string, unknown>;
  error?: string;
};

const defaultMeta: AdminListMeta = { current_page: 1, total_pages: 1, total: 0, limit: 10 };

function normalizeMeta(m: Response["meta"]): AdminListMeta {
  if (!m) return defaultMeta;
  return {
    current_page: Number(m.current_page) || 1,
    total_pages: Math.max(1, Number(m.total_pages) || 1),
    total: m.total != null ? Number(m.total) : undefined,
    limit: m.limit != null ? Number(m.limit) : 10,
  };
}

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string | string[]; search?: string | string[] }>;
}) {
  const params = await searchParams;
  const q = new URLSearchParams();
  q.set("limit", "10");
  q.set("page", String(parseAdminPage(firstQueryValue(params.page))));
  const searchRaw = firstQueryValue(params.search)?.trim();
  if (searchRaw) q.set("search", searchRaw);

  const query = q.toString();
  const cookieStore = await cookies();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/admin/orders${query ? `?${query}` : ""}`,
    {
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  const payload = (await res.json().catch(() => null)) as Response | null;
  const orders = (payload?.data ?? []) as any[];

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
        <AdminOrdersClient initialOrders={orders} meta={normalizeMeta(payload?.meta)} />
      </Suspense>
    </div>
  );
}
