"use client";

import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import AdminUnifiedToolbar from "@/components/dashboard/AdminUnifiedToolbar";
import { useAdminBatchPendingSafe } from "@/app/admin/_components/AdminBatchPendingContext";
import ProductTable from "@/app/admin/products/_components/ProductTable";
import AdminProductsFilters from "@/app/admin/products/_components/AdminProductsFilters";
import AdminTablePagination, { type AdminListMeta } from "@/components/dashboard/AdminTablePagination";
import { AdminProduct } from "@/types/product";

export default function ProductsClient({
  initialProducts,
  meta,
}: {
  initialProducts: AdminProduct[];
  meta: AdminListMeta;
}) {
  const [products, setProducts] = useState(initialProducts);
  const [isSaving, setIsSaving] = useState(false);
  const batch = useAdminBatchPendingSafe();

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  const changedProducts = useMemo(() => {
    return products.filter((p) => {
      const original = initialProducts.find((item) => item.ID === p.ID);
      return original && p.status !== original.status;
    });
  }, [products, initialProducts]);

  const hasChanges = changedProducts.length > 0;

  const dirty = useMemo(() => {
    const map: Record<number, boolean> = {};
    for (const p of products) {
      const original = initialProducts.find((item) => item.ID === p.ID);
      map[p.ID] = !!(original && p.status !== original.status);
    }
    return map;
  }, [products, initialProducts]);

  useEffect(() => {
    batch?.setPendingCount(changedProducts.length);
  }, [batch, changedProducts.length]);

  useEffect(() => {
    return () => batch?.setPendingCount(0);
  }, [batch]);

  async function handleSaveAll() {
    setIsSaving(true);
    try {
      const promises = changedProducts.map((p) =>
        fetch(`${process.env.NEXT_PUBLIC_CLIENT_API_URL}/v1/admin/products/${p.ID}/status`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ status: p.status }),
        })
      );

      await Promise.all(promises);
      toast.success(`Updated ${changedProducts.length} products successfully`);

      window.location.reload();
    } catch (e) {
      toast.error("Failed to update some products");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <AdminUnifiedToolbar
        hasDirtyHighlight
        batchActions={{
          hasChanges,
          isSaving,
          onSave: handleSaveAll,
          onReset: () => setProducts(initialProducts),
        }}
      >
        <AdminProductsFilters />
      </AdminUnifiedToolbar>

      <ProductTable
        products={products}
        dirty={dirty}
        role="admin"
        footer={<AdminTablePagination meta={meta} />}
        onStatusChange={(id, newStatus) => {
          setProducts((prev) =>
            prev.map((product) =>
              product.ID === id
                ? { ...product, status: newStatus as AdminProduct["status"] }
                : product
            )
          );
        }}
      />
    </div>
  );
}
