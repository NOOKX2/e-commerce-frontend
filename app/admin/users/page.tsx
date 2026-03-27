import { cookies } from "next/headers";
import UsersClient, { type AdminUser } from "@/components/admin/users/UsersClient";

type Response = { success: boolean; data?: AdminUser[]; error?: string };

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const params = await searchParams;
  const role = params.role ? `?role=${encodeURIComponent(params.role)}` : "";
  const cookieStore = await cookies();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/admin/users${role}`, {
    headers: { Cookie: cookieStore.toString(), "Content-Type": "application/json" },
    cache: "no-store",
  });
  const payload = (await res.json().catch(() => null)) as Response | null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        <p className="mt-1 text-sm text-gray-500">Manage buyer and seller accounts.</p>
      </div>
      {!res.ok && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
          {payload?.error ?? "Failed to load users."}
        </div>
      )}
      <UsersClient initialUsers={payload?.data ?? []} />
    </div>
  );
}

