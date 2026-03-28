"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { AdminProduct } from "@/types/product";
import { ProductHeader } from "./ProductHeader";
import { GeneralInfoForm } from "./GeneralInfoForm";
import { InventoryForm } from "./InventoryForm";
import { ProductSidebar } from "./ProductSidebar";

export default function ProductDetailClient({ initialProduct }: { initialProduct: AdminProduct }) {
  const router = useRouter();
  const [product, setProduct] = useState<AdminProduct>(initialProduct);
  const [isSaving, setIsSaving] = useState(false);

  // ตรวจสอบความเปลี่ยนแปลง (Dirty Checking)
  const hasChanges = useMemo(() => 
    JSON.stringify(product) !== JSON.stringify(initialProduct), 
    [product, initialProduct]
  );

  const handleChange = (field: string, value: any) => {
    setProduct((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_API_URL}/v1/admin/products/${product.ID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(product),
      });

      if (!res.ok) throw new Error("Failed to update product");
      
      toast.success("Product updated successfully!");
      router.refresh(); 
    } catch (error) {
      toast.error("Failed to update product");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <ProductHeader 
        name={product.name} 
        slug={product.slug} 
        hasChanges={hasChanges} 
        isSaving={isSaving} 
        onSave={handleSave} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* คอลัมน์ซ้าย: ข้อมูลหลัก */}
        <div className="lg:col-span-2 space-y-6">
          <GeneralInfoForm 
            name={product.name} 
            slug={product.slug} 
            description={product.description} 
            onChange={handleChange} 
          />
          <InventoryForm 
            price={product.price} 
            quantity={product.quantity} 
            onChange={handleChange} 
          />
        </div>

        {/* คอลัมน์ขวา: Sidebar */}
        <ProductSidebar 
          status={product.status} 
          imageUrl={product.imageUrl} 
          categoryName={product.category?.name} 
          sellerName={product.seller?.name} 
          onStatusChange={(val) => handleChange("status", val)} 
        />
      </div>
    </div>
  );
}