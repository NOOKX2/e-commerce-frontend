'use client';

import {
  ArrowLeft,
  Save,
  X,
  Upload,
  Info,
  DollarSign,
  Package as PackageIcon
} from "lucide-react";
import { useRouter } from "next/navigation";
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
  SelectValue
} from "@/components/ui/select";
import { toast } from "react-hot-toast";
import { useEffect, useState, use } from "react";
import { Category, SellerProduct } from "@/types/product";
import { ApiResponse } from "@/types/api";
import Image from "next/image";
import { uploadToR2 } from "@/lib/r2-upload";

export default function EditProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const router = useRouter();

  const [status, setStatus] = useState("active");
  const [category, setCategory] = useState("general");
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<SellerProduct | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [productRes, categoriesRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_CLIENT_API_URL}/v1/products/${slug}`),
          fetch(`${process.env.NEXT_PUBLIC_CLIENT_API_URL}/v1/categories`,)
        ]);
        if (!productRes.ok) {
          throw new Error("Product not found");
        }

        const productData: ApiResponse<SellerProduct> = await productRes.json();
        const categoriesData: ApiResponse<Category[]> = await categoriesRes.json();
        setProduct(productData.data);
        setStatus(productData.data.status);
        setCategory(productData.data.category?.slug.toLowerCase());
        setCategories(categoriesData.data)

      } catch (error) {
        toast.error("Could not load product data");
        router.push("/seller/products");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [slug]);




  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.currentTarget;
    const sku = product?.sku;

    if (!sku) {
      toast.error("SKU not found, cannot update");
      return;
    }

    let finalImageUrl = product?.imageUrl || "";
    let finalImageHash = product?.imageHash || "";

    if (imageFile) {
      const { publicUrl, fileHash } = await uploadToR2(imageFile);
      finalImageUrl = publicUrl;
      finalImageHash = fileHash;
    }

    const formData = new FormData(formElement);

    const payload = {
      name: formData.get("name"),
      description: formData.get("description"),
      price: Number(formData.get("price")),
      salePrice: Number(formData.get("salePrice")),
      costPrice: Number(formData.get("costPrice")),
      quantity: Number(formData.get("stock")),
      //vendor: formData.get("vendor"),
      status: status,
      category: category,
      imageUrl: finalImageUrl,
      imageHash: finalImageHash,
    };

    try {
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
      router.push(`/seller/products/${slug}`);
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update product");
    }
  };

  if (loading || !product) {
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
    <div className="pb-16">
      <form onSubmit={handleSave}>
        <header className="sticky top-0 z-10 -mx-4 mb-8 bg-white/80 px-4 py-4 backdrop-blur-md shadow-sm sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <div className="flex items-center gap-4">
              <Button type="button" variant="ghost" size="icon" className="rounded-full" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-xl font-semibold tracking-tight text-slate-900">Edit product</h1>
            </div>
            <div className="flex items-center gap-3">
              <Button type="button" variant="secondary" className="rounded-2xl bg-neutral-100 font-medium shadow-none hover:bg-neutral-200/80" onClick={() => router.back()}>Cancel</Button>
              <Button type="submit" className="rounded-2xl bg-blue-600 text-white shadow-sm hover:bg-blue-700">
                <Save className="w-4 h-4 mr-2" /> Save
              </Button>
            </div>
          </div>
        </header>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-0 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {/* 1. General Information */}
            <Card className="rounded-3xl border-0 bg-white py-8 shadow-sm">
              <CardHeader className="px-8"><CardTitle className="flex items-center gap-2"><Info className="w-4 h-4 text-blue-500" /> General Info</CardTitle></CardHeader>
              <CardContent className="space-y-4 px-8">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input id="name" name="name" defaultValue={product?.name} placeholder="e.g. iPhone 15 Pro" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" className="min-h-32" defaultValue={product?.description} />
                </div>
              </CardContent>
            </Card>

            {/* 2. Media Upload */}
            <Card className="rounded-3xl border-0 bg-white py-8 shadow-sm">
              <CardHeader className="px-8"><CardTitle>Media Gallery</CardTitle>              </CardHeader>
              <CardContent className="px-8">
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-neutral-100">
                    <Image
                      src={imageFile ? URL.createObjectURL(imageFile) : (product?.imageUrl || "/fallback-image.png")}
                      className="w-full h-full object-cover"
                      alt="Preview"
                      width={200}
                      height={200}
                    />
                    {imageFile && (
                      <button
                        type="button"
                        onClick={() => setImageFile(null)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                  <Label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-neutral-200 text-neutral-400 transition-colors hover:bg-neutral-50">
                    <Upload className="w-6 h-6 mb-1" />
                    <span className="text-[10px]">Change Image</span>
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
                <CardHeader className="px-8"><CardTitle className="text-sm flex items-center gap-2"><DollarSign className="w-4 h-4 text-green-500" /> Pricing</CardTitle></CardHeader>
                <CardContent className="space-y-4 px-8">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input id="price" name="price" type="number" defaultValue={product?.price} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salePrice">Sale Price ($)</Label>
                    <Input id="salePrice" name="salePrice" type="number" defaultValue={product?.salePrice} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="costPrice">Cost Price ($)</Label>
                    <Input id="costPrice" name="costPrice" type="number" defaultValue={product?.costPrice} />
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border-0 bg-white py-8 shadow-sm">
                <CardHeader className="px-8"><CardTitle className="text-sm flex items-center gap-2"><PackageIcon className="w-4 h-4 text-orange-500" /> Inventory</CardTitle></CardHeader>
                <CardContent className="space-y-4 px-8">
                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock</Label>
                    <Input id="stock" name="stock" type="number" defaultValue={product?.quantity} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU Code</Label>
                    <p>{product?.sku} </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="rounded-3xl border-0 bg-white py-8 shadow-sm">
              <CardHeader className="px-8"><CardTitle>Status</CardTitle>              </CardHeader>
              <CardContent className="px-8">
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-0 bg-white py-8 shadow-sm">
              <CardHeader className="px-8"><CardTitle>Organization</CardTitle></CardHeader>
              <CardContent className="space-y-4 px-8">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {categories.length > 0 ? (
                        categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.slug}>
                            {cat.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="none" disabled>No categories found</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vendor">Vendor</Label>
                  <Input id="vendor" name="vendor" defaultValue="" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}