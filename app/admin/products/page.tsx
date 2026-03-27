import { cookies } from "next/headers";
import ProductsClient, { type AdminProduct } from "@/app/admin/products/_components/ProductsClient";

type Response = { success: boolean; data?: AdminProduct[]; error?: string };

export default async function AdminProductsPage() {
  const cookieStore = await cookies();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/admin/products`, {
    headers: { Cookie: cookieStore.toString(), "Content-Type": "application/json" },
    cache: "no-store",
  });
  const payload = (await res.json().catch(() => null)) as Response | null;

  console.log(payload?.data);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <p className="mt-1 text-sm text-gray-500">Moderate products across the platform.</p>
      </div>
      {!res.ok && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
          {payload?.error ?? "Failed to load products."}
        </div>
      )}
      <ProductsClient initialProducts={payload?.data ?? []} />
    </div>
  );
}

