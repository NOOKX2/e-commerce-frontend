import { Suspense } from "react";
import { AdminProduct } from "@/types/product";
import { cookies } from "next/headers";
import WorkspacePageHeader from "@/components/dashboard/WorkspacePageHeader";
import ProductsClient from "./_components/ProductsClient";

type Response = { success: boolean; data?: AdminProduct[]; error?: string };

export default async function AdminProductsPage() {
  const cookieStore = await cookies();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/admin/products`, {
    headers: { Cookie: cookieStore.toString(), "Content-Type": "application/json" },
    cache: "no-store",
  });
  const payload = (await res.json().catch(() => null)) as Response | null;

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <WorkspacePageHeader
        title="Products"
        description="Moderate products across the platform."
      />
      {!res.ok && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
          {payload?.error ?? "Failed to load products."}
        </div>
      )}
      <Suspense
        fallback={
          <div className="h-40 animate-pulse rounded-3xl bg-neutral-100" />
        }
      >
        <ProductsClient initialProducts={payload?.data ?? []} />
      </Suspense>
    </div>
  );
}

