import UsersClient from "@/app/admin/users/_components/UsersClient";
import { firstQueryValue, parseAdminPage } from "@/app/admin/_lib/query-params";
import WorkspacePageHeader from "@/components/dashboard/WorkspacePageHeader";
import type { AdminListMeta } from "@/components/dashboard/AdminTablePagination";
import { AdminUser } from "@/types/user";
import { cookies } from "next/headers";

type Response = {
  success: boolean;
  data?: AdminUser[];
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

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{
    role?: string | string[];
    search?: string | string[];
    page?: string | string[];
  }>;
}) {
  const params = await searchParams;
  const q = new URLSearchParams();
  q.set("limit", "10");
  q.set("page", String(parseAdminPage(firstQueryValue(params.page))));
  const roleRaw = firstQueryValue(params.role)?.trim();
  const searchRaw = firstQueryValue(params.search)?.trim();
  if (roleRaw) {
    q.set("role", roleRaw.toLowerCase());
  }
  if (searchRaw) {
    q.set("search", searchRaw);
  }
  const query = q.toString();
  const cookieStore = await cookies();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/admin/users${query ? `?${query}` : ""}`,
    {
      headers: { Cookie: cookieStore.toString(), "Content-Type": "application/json" },
      cache: "no-store",
    }
  );
  const payload = (await res.json().catch(() => null)) as Response | null;

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <WorkspacePageHeader
        title="Users"
        description="Manage buyer and seller accounts."
      />
      {!res.ok && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
          {payload?.error ?? "Failed to load users."}
        </div>
      )}
      <UsersClient initialUsers={payload?.data ?? []} meta={normalizeMeta(payload?.meta)} />
    </div>
  );
}

