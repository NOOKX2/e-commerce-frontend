'use client';

import { ArrowLeft, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useMemo } from "react";
import { Category, SellerProduct } from "@/types/product";
import { GeneralInfoCard } from "./GeneralInfoCard";
import { MediaGalleryCard } from "./MediaGalleryCard";
import { PricingInventoryCard } from "./PricingInventoryCard";
import { OrganizationSidebar } from "./OrganizationSidebar";



export type ProductFormPayload = {
  name: string;
  description: string;
  price: number;
  costPrice: number;
  salePrice: number;
  quantity: number;
  categoryID: number;
  status: string;
};

interface ProductFormProps {
  initialData?: SellerProduct | null;
  categories: Category[];
  onSubmit: (data: ProductFormPayload, imageFile: File | null) => Promise<void>;
  isLoading: boolean;
}

export function ProductForm({ initialData, categories, onSubmit, isLoading }: ProductFormProps) {
  const router = useRouter();
  const isEdit = !!initialData;

  // --- State ---
  const [status, setStatus] = useState("active");
  const [categoryID, setCategoryID] = useState("");
  const [vendor, setVendor] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [salePrice, setSalePrice] = useState("0");
  const [quantity, setQuantity] = useState("0");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // --- Populate Data ---
  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description || "");
      setPrice(String(initialData.price));
      setCostPrice(String(initialData.costPrice));
      setSalePrice(String(initialData.salePrice || 0));
      setQuantity(String(initialData.quantity));
      setStatus(initialData.status);
      setCategoryID(String(initialData.category?.id || ""));
    } else if (categories.length > 0 && !categoryID) {
      setCategoryID(String(categories[0].id));
    }
  }, [initialData, categories]);

  // Image Preview
  useEffect(() => {
    if (!imageFile) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(imageFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  // --- Validation ---
  const canSubmit = useMemo(() => {
    const p = Number(price);
    const cp = Number(costPrice);
    const qty = Number(quantity);
    return (
      name.trim().length > 0 &&
      categoryID !== "" &&
      Number.isFinite(p) && p > 0 &&
      Number.isFinite(cp) && cp >= 0 &&
      Number.isFinite(qty) && qty >= 0
    );
  }, [name, categoryID, price, costPrice, quantity]);

  // --- Submit ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    const payload: ProductFormPayload = {
      name,
      description,
      price: Number(price),
      costPrice: Number(costPrice),
      salePrice: Number(salePrice),
      quantity: Number(quantity),
      categoryID: Number(categoryID),
      status,
      // สามารถเพิ่ม vendor ลงไปใน payload ได้ถ้าต้องการส่งไป Backend
    };

    await onSubmit(payload, imageFile);
  };

  return (
    <form onSubmit={handleSubmit} className="pb-16">
      {/* Header */}
      <header className="sticky top-0 z-10 -mx-4 mb-8 bg-white/80 px-4 py-4 backdrop-blur-md shadow-sm sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-4">
            <Button type="button" variant="ghost" size="icon" className="rounded-full" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-xl font-semibold tracking-tight text-slate-900">
              {isEdit ? "Edit product" : "Add product"}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Button type="button" variant="secondary" className="rounded-2xl bg-neutral-100 font-medium shadow-none hover:bg-neutral-200/80" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || !canSubmit} className="rounded-2xl bg-blue-600 text-white shadow-sm hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? (isEdit ? "Saving..." : "Creating...") : (isEdit ? "Save Changes" : "Create")}
            </Button>
          </div>
        </div>
      </header>

      {/* Form Content - โค้ดเหลือแค่นี้! เรียบร้อยมากๆ */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-0 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <GeneralInfoCard 
            name={name} onNameChange={setName} 
            description={description} onDescriptionChange={setDescription} 
          />
          <MediaGalleryCard 
            imageFile={imageFile} previewUrl={previewUrl} initialImageUrl={initialData?.imageUrl} 
            onImageChange={setImageFile} isEdit={isEdit} 
          />
          <PricingInventoryCard 
            price={price} costPrice={costPrice} salePrice={salePrice} quantity={quantity} sku={initialData?.sku} isEdit={isEdit}
            onPriceChange={setPrice} onCostPriceChange={setCostPrice} onSalePriceChange={setSalePrice} onQuantityChange={setQuantity}
          />
        </div>

        <OrganizationSidebar 
          status={status} categoryID={categoryID} vendor={vendor} categories={categories} isEdit={isEdit}
          onStatusChange={setStatus} onCategoryIDChange={setCategoryID} onVendorChange={setVendor}
        />
      </div>
    </form>
  );
}