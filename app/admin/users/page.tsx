import UsersClient from "@/app/admin/users/_components/UsersClient";
import WorkspacePageHeader from "@/components/dashboard/WorkspacePageHeader";
import { AdminUser } from "@/types/user";
import { cookies } from "next/headers";

type Response = { success: boolean; data?: AdminUser[]; error?: string };

function firstQueryValue(v: string | string[] | undefined): string | undefined {
  if (v === undefined) return undefined;
  if (Array.isArray(v)) return v[0];
  return v;
}

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string | string[]; search?: string | string[] }>;
}) {
  const params = await searchParams;
  const q = new URLSearchParams();
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
      <UsersClient initialUsers={payload?.data ?? []} />
    </div>
  );
}

