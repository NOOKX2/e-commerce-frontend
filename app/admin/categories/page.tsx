import { cookies } from "next/headers";
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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
        <p className="mt-1 text-sm text-gray-500">Create, edit, or delete product categories.</p>
      </div>

      {!res.ok && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
          {payload?.error ?? "Failed to load categories."}
        </div>
      )}

      <CategoriesClient initialCategories={categories} />
    </div>
  );
}

