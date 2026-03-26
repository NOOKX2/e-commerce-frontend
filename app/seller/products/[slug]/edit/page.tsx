"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import type { Category, SellerProduct } from "@/types/product";
import type { ApiResponse } from "@/types/api";
import { uploadToR2 } from "@/lib/r2-upload";
import { ProductForm, ProductFormPayload } from "../../_components/ProductForm";

export default function EditProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const router = useRouter();

  // --- States ---
  const [categories, setCategories] = useState<Category[]>([]);
  const [product, setProduct] = useState<SellerProduct | null>(null);

  const [isLoadingSpec, setIsLoadingSpec] = useState(true); // สำหรับตอนดึงข้อมูลเดิมครั้งแรก
  const [isSaving, setIsSaving] = useState(false);          // สำหรับตอนกด Save

  // 1. Fetch Product Data & Categories
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [productRes, categoriesRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_CLIENT_API_URL}/v1/products/${slug}`),
          fetch(`${process.env.NEXT_PUBLIC_CLIENT_API_URL}/v1/categories`, { cache: 'no-store' })
        ]);

        if (!productRes.ok) {
          throw new Error("Product not found");
        }

        const productData: ApiResponse<SellerProduct> = await productRes.json();
        const categoriesData: ApiResponse<Category[]> = await categoriesRes.json();

        setProduct(productData.data);

        // Handle Categories API shape variations
        if (Array.isArray(categoriesData?.data)) {
          setCategories(categoriesData.data as Category[]);
        } else {
          setCategories([]);
        }

      } catch (error) {
        toast.error("Could not load product data");
        router.push("/seller/products");
      } finally {
        setIsLoadingSpec(false);
      }
    };

    fetchInitialData();
  }, [slug, router]);

  // 2. Handle Logic PUT API
  const handleSubmit = async (formData: ProductFormPayload, imageFile: File | null) => {
    const sku = product?.sku;

    if (!sku) {
      toast.error("SKU not found, cannot update");
      return;
    }

    setIsSaving(true);
    try {
      // จัดการอัปโหลดรูป: ถ้ารูปใหม่ใช้ของใหม่ ถ้ารูปเดิมให้คงของเดิมไว้
      let finalImageUrl = product?.imageUrl || "";
      let finalImageHash = product?.imageHash || "";

      if (imageFile) {
        const { publicUrl, fileHash } = await uploadToR2(imageFile);
        finalImageUrl = publicUrl;
        finalImageHash = fileHash;
      }

      // หาชื่อหมวดหมู่จาก ID ที่ Form ส่งมา
      const selectedCategory = categories.find(c => c.id === formData.categoryID);
      const categoryName = selectedCategory ? selectedCategory.name : "";

      // เตรียม Payload สำหรับ Backend
      const payload = {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        salePrice: formData.salePrice, // Edit page มี salePrice
        costPrice: formData.costPrice,
        quantity: formData.quantity,
        status: formData.status,
        category: categoryName, // ส่งชื่อกลับไปให้ Backend เหมือนหน้า Add
        imageUrl: finalImageUrl,
        imageHash: finalImageHash,
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_API_URL}/v1/seller/products/${sku}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: 'include'
      });

      if (!res.ok) throw new Error("Failed to update product");

      toast.success("Product updated successfully!");
      // ส่งกลับไปหน้า View Product 
      router.push(`/seller/products/${slug}`);
    } catch (error: any) {
      console.error("Update failed:", error);
      toast.error(error.message || "Failed to update product");
    } finally {
      setIsSaving(false);
    }
  };

  // Loading State แบบมี Spinner ตอนเข้ามาหน้า Edit ครั้งแรก
  if (isLoadingSpec || !product) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-neutral-200 border-t-blue-600" />
          <p className="mt-4 text-sm text-neutral-500">Loading product…</p>
        </div>
      </div>
    );
  }

  return (
    <ProductForm
      initialData={product} // ส่ง initialData ไป แปลว่าเป็นโหมด "Edit"
      categories={categories}
      onSubmit={handleSubmit}
      isLoading={isSaving}
    />
  );
}