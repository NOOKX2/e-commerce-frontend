import { Suspense } from "react";
import { cookies } from "next/headers";
import WorkspacePageHeader from "@/components/dashboard/WorkspacePageHeader";
import CategoriesClient from "./_components/CategoriesClient";

export type AdminCategory = {
  id: number;
  name: string;
  slug: string;
  createdAt: string;
};

type ListResponse = {
  success: boolean;
  data?: AdminCategory[];
  error?: string;
};

export default async function AdminCategoriesPage() {
  const cookieStore = await cookies();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/admin/categories`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  const payload = (await res.json().catch(() => null)) as ListResponse | null;
  const categories = payload?.data ?? [];

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <WorkspacePageHeader
        title="Categories"
        description="Create, edit, or delete product categories."
      />

      {!res.ok && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
          {payload?.error ?? "Failed to load categories."}
        </div>
      )}

      <Suspense
        fallback={
          <div className="rounded-2xl border border-slate-100 bg-white p-8 text-sm text-neutral-500 shadow-sm">
            Loading…
          </div>
        }
      >
        <CategoriesClient initialCategories={categories} />
      </Suspense>
    </div>
  );
}

