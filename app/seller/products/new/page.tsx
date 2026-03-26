"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Info,
  Package as PackageIcon,
  Save,
  Tag,
  Upload,
} from "lucide-react";
import Image from "next/image";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Category } from "@/types/product";
import { uploadToR2 } from "@/lib/r2-upload";

type AddProductFormState = {
  name: string;
  description: string;
  price: string;
  costPrice: string;
  quantity: string;
  categoryName: string;
};

export default function AddProductPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState<AddProductFormState>({
    name: "",
    description: "",
    price: "",
    costPrice: "",
    quantity: "0",
    categoryName: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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

  useEffect(() => {
    if (!form.categoryName && categories.length > 0) {
      setForm((prev) => ({ ...prev, categoryName: categories[0].name }));
    }
  }, [categories, form.categoryName]);

  useEffect(() => {
    if (!imageFile) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(imageFile);
    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [imageFile]);

  const canSubmit = useMemo(() => {
    const price = Number(form.price);
    const costPrice = Number(form.costPrice);
    const qty = Number(form.quantity);

    return (
      form.name.trim().length > 0 &&
      form.categoryName.trim().length > 0 &&
      Number.isFinite(price) &&
      price > 0 &&
      Number.isFinite(costPrice) &&
      costPrice >= 0 &&
      Number.isFinite(qty) &&
      qty >= 0
    );
  }, [form]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) {
      toast.error("Please fill all required fields correctly.");
      return;
    }

    setIsLoading(true);
    try {
      let finalImageUrl = "";
      let finalImageHash = "";

      if (imageFile) {
        const { publicUrl, fileHash } = await uploadToR2(imageFile);
        finalImageUrl = publicUrl;
        finalImageHash = fileHash;
      }

      const payload = {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        costPrice: Number(form.costPrice),
        quantity: Number(form.quantity),
        imageUrl: finalImageUrl,
        imageHash: finalImageHash,
        sku: "",
        // backend will slugify category name automatically on AddProduct
        category: form.categoryName,
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
    } catch (err) {
      console.error("Create product failed:", err);
      toast.error("Failed to create product.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pb-16">
      <form onSubmit={handleSubmit}>
        <header className="sticky top-0 z-10 -mx-4 mb-8 bg-white/80 px-4 py-4 backdrop-blur-md shadow-sm sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => router.push("/seller/products")}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-xl font-semibold tracking-tight text-slate-900">Add product</h1>
            </div>

            <div className="flex items-center gap-3">
              <Button type="button" variant="secondary" className="rounded-2xl bg-neutral-100 font-medium shadow-none hover:bg-neutral-200/80" onClick={() => router.push("/seller/products")}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading || !canSubmit}
                className="rounded-2xl bg-blue-600 text-white shadow-sm hover:bg-blue-700"
              >
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? "Creating..." : "Create"}
              </Button>
            </div>
          </div>
        </header>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-0 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card className="rounded-3xl border-0 bg-white py-8 shadow-sm">
              <CardHeader className="px-8">
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-blue-500" /> General Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 px-8">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="e.g. Macbook Pro"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    className="min-h-32"
                    value={form.description}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Tell more about your product..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* 2. Media Upload */}
            <Card className="rounded-3xl border-0 bg-white py-8 shadow-sm">
              <CardHeader className="px-8">
                <CardTitle>Media Gallery</CardTitle>
              </CardHeader>
              <CardContent className="px-8">
                <div className="mb-4 grid grid-cols-4 gap-4">
                  <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-neutral-100">
                    <Image
                      src={
                        previewUrl ||
                        "/fallback-image.png"
                      }
                      alt="Preview"
                      className="w-full h-full object-cover"
                      width={200}
                      height={200}
                    />
                  </div>

                  <Label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-neutral-200 text-neutral-400 transition-colors hover:bg-neutral-50">
                    <Upload className="w-6 h-6 mb-1" />
                    <span className="text-[10px]">Upload Image</span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    />
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* 3. Pricing & Inventory */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="rounded-3xl border-0 bg-white py-8 shadow-sm">
                <CardHeader className="px-8">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <PackageIcon className="w-4 h-4 text-green-500" /> Pricing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 px-8">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      required
                      value={form.price}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, price: e.target.value }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="costPrice">Cost Price ($)</Label>
                    <Input
                      id="costPrice"
                      name="costPrice"
                      type="number"
                      required
                      value={form.costPrice}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          costPrice: e.target.value,
                        }))
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border-0 bg-white py-8 shadow-sm">
                <CardHeader className="px-8">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <PackageIcon className="w-4 h-4 text-orange-500" /> Inventory
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 px-8">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Stock</Label>
                    <Input
                      id="quantity"
                      name="quantity"
                      type="number"
                      required
                      value={form.quantity}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          quantity: e.target.value,
                        }))
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="rounded-3xl border-0 bg-white py-8 shadow-sm">
              <CardHeader className="px-8">
                <CardTitle>Status</CardTitle>
              </CardHeader>
              <CardContent className="px-8">
                <div className="flex items-center justify-between border-b border-neutral-100 py-2">
                  <span className="text-sm text-neutral-500">Availability</span>
                  <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </div>
                <p className="mt-3 text-xs text-muted-foreground">
                  New products are created as <span className="font-medium">Active</span>.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-0 bg-white py-8 shadow-sm">
              <CardHeader className="px-8">
                <CardTitle className="flex items-center gap-2">
                  <Tag className="w-4 h-4" /> Organization
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 px-8">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={form.categoryName} onValueChange={(v) => setForm((prev) => ({ ...prev, categoryName: v }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.length > 0 ? (
                        categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.name}>
                            {cat.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="none" disabled>
                          No categories found
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}

