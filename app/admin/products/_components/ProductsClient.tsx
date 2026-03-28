"use client";

import { useState, useMemo } from "react";
import toast from "react-hot-toast";

import ProductTable from "@/app/admin/products/_components/ProductTable";
import { AdminProduct } from "@/types/product";
import BatchActionBar from "@/components/dashboard/BatchActionBar";

export default function ProductsClient({ initialProducts }: { initialProducts: AdminProduct[] }) {
  const [products, setProducts] = useState(initialProducts);
  const [isSaving, setIsSaving] = useState(false);

  // 1. ตรวจสอบว่ามีรายการไหนถูกแก้ไขบ้าง
  const changedProducts = useMemo(() => {
    return products.filter((p) => {
      const original = initialProducts.find((item) => item.ID === p.ID);
      return original && p.status !== original.status;
    });
  }, [products, initialProducts]);

  const hasChanges = changedProducts.length > 0;

  // 2. ฟังก์ชัน Batch Update ยิงไปที่ Go Backend
  async function handleSaveAll() {
    setIsSaving(true);
    try {
      // ตัวอย่างการส่งแบบ Batch (คุณอาจต้องปรับ Endpoint ใน Go ให้รับ Array)
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

      // หลังจากเซฟเสร็จ ให้ถือว่าข้อมูลปัจจุบันคือค่าเริ่มต้นใหม่ (ในที่นี้อาจใช้วิธี Refresh หน้า)
      window.location.reload();
    } catch (e) {
      toast.error("Failed to update some products");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <BatchActionBar
        hasChanges={hasChanges}
        changedCount={changedProducts.length}
        isSaving={isSaving}
        onSave={handleSaveAll}
        onReset={() => setProducts(initialProducts)}
        title="Product Management"
        subTitle="Moderate products across the platform"
      />

      {/* Product Table ของคุณ */}
      <ProductTable products={products}
        role="admin"
        onStatusChange={(id, newStatus) => {
          setProducts((prev) =>
            prev.map((product) =>
              product.ID === id ? { ...product, status: newStatus as AdminProduct['status'] } : product
            )
          );
        }} />
    </div>
  );
}