"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ArrowLeft, Save, ImageIcon } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AdminProduct } from "@/types/product";
import { cn } from "@/lib/utils";

export default function ProductDetailClient({ initialProduct }: { initialProduct: AdminProduct }) {
  const router = useRouter();
  const [product, setProduct] = useState<AdminProduct>(initialProduct);
  const [isSaving, setIsSaving] = useState(false);

  // ตรวจสอบว่ามีการแก้ไขข้อมูลหรือไม่
  const hasChanges = useMemo(() => {
    return JSON.stringify(product) !== JSON.stringify(initialProduct);
  }, [product, initialProduct]);

  const handleChange = (field: keyof AdminProduct, value: any) => {
    setProduct((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // ตัวอย่างการยิง API อัปเดตข้อมูล (ปรับ Endpoint ตาม Go Backend ของคุณ)
      const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_API_URL}/v1/admin/products/${product.ID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(product),
      });

      if (!res.ok) throw new Error("Failed to update product");
      
      toast.success("Product updated successfully!");
      router.refresh(); // รีเฟรชข้อมูลเซิร์ฟเวอร์
    } catch (error) {
      toast.error("Failed to update product");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      
      {/* 1. Header & Sticky Action Bar */}
      <div className={cn(
        "sticky top-0 z-40 flex items-center justify-between bg-white/80 backdrop-blur-md p-4 rounded-4xl border transition-all duration-300",
        hasChanges ? "border-blue-200 ring-4 ring-blue-500/5 shadow-md" : "border-slate-100 shadow-sm"
      )}>
        <div className="flex items-center gap-4 ml-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full hover:bg-slate-100">
            <ArrowLeft className="h-5 w-5 text-slate-600" />
          </Button>
          <div>
            <h1 className="text-lg font-black text-slate-900 tracking-tight">Edit Product</h1>
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">{product.slug}</p>
          </div>
        </div>
        
        <Button
          disabled={!hasChanges || isSaving}
          onClick={handleSave}
          className={cn(
            "rounded-xl px-8 h-10 font-black text-[11px] uppercase tracking-widest transition-all active:scale-95",
            hasChanges
              ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200"
              : "bg-slate-50 text-slate-300 border border-slate-100 cursor-not-allowed"
          )}
        >
          <Save className={cn("h-4 w-4 mr-2", isSaving && "animate-pulse")} />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {/* 2. Main Content Layout (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Main Details) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* General Info Card */}
          <div className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm space-y-6">
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 border-b border-slate-50 pb-4">General Information</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">Product Name</Label>
                <Input 
                  value={product.name} 
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all px-4 font-semibold text-slate-900"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">Slug (URL)</Label>
                <Input 
                  value={product.slug} 
                  onChange={(e) => handleChange("slug", e.target.value)}
                  className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all px-4 text-slate-500 font-mono text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">Description</Label>
                <textarea 
                  value={product.description || ""} 
                  onChange={(e) => handleChange("description", e.target.value)}
                  className="w-full min-h-30 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white transition-all p-4 text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Enter product description..."
                />
              </div>
            </div>
          </div>

          {/* Pricing & Inventory Card */}
          <div className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm space-y-6">
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 border-b border-slate-50 pb-4">Pricing & Inventory</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">Price (฿)</Label>
                <Input 
                  type="number"
                  value={product.price} 
                  onChange={(e) => handleChange("price", Number(e.target.value))}
                  className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all px-4 font-black text-slate-900 tabular-nums text-lg"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">Stock Quantity</Label>
                <Input 
                  type="number"
                  value={product.quantity} 
                  onChange={(e) => handleChange("quantity", Number(e.target.value))}
                  className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all px-4 font-bold text-slate-900"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Sidebar) */}
        <div className="space-y-6">
          
          {/* Status Card */}
          <div className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm space-y-6">
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 border-b border-slate-50 pb-4">Status</h2>
            <div className="space-y-2">
              <Label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">Product Status</Label>
              <Select value={product.status} onValueChange={(val) => handleChange("status", val)}>
                <SelectTrigger className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 font-bold uppercase text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["active", "inactive", "draft", "archived"].map((s) => (
                    <SelectItem key={s} value={s} className="text-[11px] font-bold uppercase">{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Media/Image Card */}
          <div className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm space-y-6">
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 border-b border-slate-50 pb-4">Media</h2>
            <div className="aspect-square w-full rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center overflow-hidden relative group cursor-pointer hover:bg-slate-100 transition-colors">
              {product.imageUrl ? (
                <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
              ) : (
                <div className="text-center space-y-2">
                  <ImageIcon className="h-8 w-8 text-slate-400 mx-auto" />
                  <span className="text-xs font-bold text-slate-400">Upload Image</span>
                </div>
              )}
              {/* Overlay for hovering */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-xs font-bold uppercase tracking-widest">Change Image</span>
              </div>
            </div>
          </div>

          {/* Organization Card */}
          <div className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm space-y-6">
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 border-b border-slate-50 pb-4">Organization</h2>
            <div className="space-y-4">
               <div className="space-y-1">
                 <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Category</p>
                 <p className="text-sm font-semibold text-slate-900">{product.category?.name || "Uncategorized"}</p>
               </div>
               <div className="space-y-1">
                 <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Seller</p>
                 <p className="text-sm font-semibold text-blue-600">{product.seller?.name || "Unknown Seller"}</p>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}