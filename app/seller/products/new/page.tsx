"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import type { Category } from "@/types/product";
import { uploadToR2 } from "@/lib/r2-upload";
import { ProductForm, ProductFormPayload } from "../_components/ProductForm";

export default function AddProductPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  // 1. Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/v1/categories`,
          { cache: "no-store" }
        );
        if (!res.ok) return;
        const json = await res.json();
        
        if (json?.success && Array.isArray(json.data)) {
          setCategories(json.data as Category[]);
        } else if (Array.isArray(json?.data)) {
          // fallback if API shape changes slightly
          setCategories(json.data as Category[]);
        }
      } catch (e) {
        console.error("Failed to fetch categories", e);
      }
    };

    fetchCategories();
  }, []);

  // 2. Handle Logic POST API
  const handleSubmit = async (formData: ProductFormPayload, imageFile: File | null) => {
    setIsLoading(true);
    try {
      // จัดการอัปโหลดรูป
      let finalImageUrl = "";
      let finalImageHash = "";

      if (imageFile) {
        const { publicUrl, fileHash } = await uploadToR2(imageFile);
        finalImageUrl = publicUrl;
        finalImageHash = fileHash;
      }

      // 💡 สำคัญ: ในโค้ดเดิมของคุณ Backend รับ category เป็น "ชื่อ" (string)
      // เราจึงต้องหาชื่อหมวดหมู่จาก ID ที่ ProductForm ส่งมา
      const selectedCategory = categories.find(c => c.id === formData.categoryID);
      const categoryName = selectedCategory ? selectedCategory.name : "";

      const payload = {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        costPrice: formData.costPrice,
        quantity: formData.quantity,
        imageUrl: finalImageUrl,
        imageHash: finalImageHash,
        sku: "",
        category: categoryName, // ส่งชื่อกลับไปให้ตรงกับ Backend โค้ดเดิม
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/v1/seller/products`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          credentials: "include",
        }
      );

      if (!res.ok) {
        const errJson = await res.json().catch(() => null);
        throw new Error(
          errJson?.error || errJson?.message || "Failed to create product"
        );
      }

      const data = await res.json();
      const slug = data?.product?.slug;

      toast.success("Product created successfully!");
      if (slug) router.push(`/seller/products/${slug}`);
      else router.push("/seller/products");
    } catch (err: any) {
      console.error("Create product failed:", err);
      toast.error(err.message || "Failed to create product.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProductForm
      initialData={null} // null = โหมด Add
      categories={categories}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
}