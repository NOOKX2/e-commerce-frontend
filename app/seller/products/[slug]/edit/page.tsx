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
  const [loading, setLoading] = useState(false);
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
        console.log("category data", categoriesData.data);
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




  console.log("product in edit", product);

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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product data...</p>
        </div>
      </div>
    );
  }

  console.log("category array", categories);

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      <form onSubmit={handleSave}>
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white border-b px-6 py-4 mb-8">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button type="button" variant="ghost" size="icon" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-xl font-bold text-gray-900">Edit Product</h1>
            </div>
            <div className="flex items-center gap-3">
              <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                <Save className="w-4 h-4 mr-2" /> Save Changes
              </Button>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* 1. General Information */}
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Info className="w-4 h-4 text-blue-500" /> General Info</CardTitle></CardHeader>
              <CardContent className="space-y-4">
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
            <Card>
              <CardHeader><CardTitle>Media Gallery</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="aspect-square bg-gray-100 rounded-lg border flex items-center justify-center relative group overflow-hidden">
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
                  <Label className="aspect-square border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors cursor-pointer">
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
              <Card>
                <CardHeader><CardTitle className="text-sm flex items-center gap-2"><DollarSign className="w-4 h-4 text-green-500" /> Pricing</CardTitle></CardHeader>
                <CardContent className="space-y-4">
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

              <Card>
                <CardHeader><CardTitle className="text-sm flex items-center gap-2"><PackageIcon className="w-4 h-4 text-orange-500" /> Inventory</CardTitle></CardHeader>
                <CardContent className="space-y-4">
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
          <div className="space-y-8">
            <Card>
              <CardHeader><CardTitle>Status</CardTitle></CardHeader>
              <CardContent>
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

            <Card>
              <CardHeader><CardTitle>Organization</CardTitle></CardHeader>
              <CardContent className="space-y-4">
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