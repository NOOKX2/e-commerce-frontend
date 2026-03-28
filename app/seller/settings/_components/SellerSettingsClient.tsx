"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { Building2, MapPin, Landmark, Save, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SellerShopSettings } from "@/types/settings";
import { cn } from "@/lib/utils";
import { uploadToR2 } from "@/lib/r2-upload";

export default function SellerSettingsClient({
  initialShop,
}: {
  initialShop: SellerShopSettings;
}) {
  const [shop, setShop] = useState<SellerShopSettings>(initialShop);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);

  const hasChanges = useMemo(
    () => JSON.stringify(shop) !== JSON.stringify(initialShop),
    [shop, initialShop]
  );

  const update = <K extends keyof SellerShopSettings>(key: K, value: SellerShopSettings[K]) => {
    setShop((prev) => ({ ...prev, [key]: value }));
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingLogo(true);
    try {
      const { publicUrl } = await uploadToR2(file);
      update("logoUrl", publicUrl);
      toast.success("Logo uploaded — remember to save changes");
    } catch (err) {
      console.error(err);
      toast.error("Logo upload failed");
    } finally {
      setIsUploadingLogo(false);
      e.target.value = "";
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_API_URL}/v1/seller/settings/shop`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          shopName: shop.shopName,
          description: shop.description,
          logoUrl: shop.logoUrl,
          pickupAddress: shop.pickupAddress,
          bankName: shop.bankName,
          accountNumber: shop.accountNumber,
          accountHolder: shop.accountHolder,
        }),
      });
      if (!res.ok) throw new Error("save failed");
      toast.success("Shop settings saved");
      window.location.reload();
    } catch {
      toast.error("Could not save settings");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 pb-12">
      <div
        className={cn(
          "sticky top-0 z-30 flex flex-col gap-4 rounded-[2rem] border bg-white/90 p-4 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between",
          hasChanges ? "border-blue-200 shadow-md ring-4 ring-blue-500/5" : "border-slate-200/80 shadow-sm"
        )}
      >
        <div>
          <h1 className="text-lg font-black tracking-tight text-slate-900">Store settings</h1>
          <p className="text-xs font-medium text-slate-500">
            Profile, pickup, and payout details for your shop.
          </p>
        </div>
        <Button
          type="button"
          disabled={!hasChanges || isSaving}
          onClick={handleSave}
          className={cn(
            "h-11 rounded-2xl px-8 text-[11px] font-black uppercase tracking-widest",
            hasChanges
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "cursor-not-allowed bg-slate-100 text-slate-400"
          )}
        >
          <Save className={cn("mr-2 h-4 w-4", isSaving && "animate-pulse")} />
          {isSaving ? "Saving…" : "Save changes"}
        </Button>
      </div>

      {/* Shop profile */}
      <section className="space-y-6 rounded-[2rem] border border-slate-100 bg-white p-8 shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50">
            <Building2 className="h-5 w-5 text-slate-700" />
          </div>
          <div>
            <h2 className="text-base font-black text-slate-900">Shop profile</h2>
            <p className="text-xs text-slate-500">Name, description, and logo</p>
          </div>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="flex flex-col items-center gap-3 sm:w-40">
            <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-3xl border border-slate-100 bg-slate-50">
              {shop.logoUrl ? (
                <Image src={shop.logoUrl} alt="Shop logo" fill className="object-cover" unoptimized />
              ) : (
                <Building2 className="h-10 w-10 text-slate-300" />
              )}
            </div>
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handleLogoUpload}
                disabled={isUploadingLogo}
              />
              <span className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-2 text-xs font-bold text-white transition hover:bg-slate-800">
                <Upload className="h-3.5 w-3.5" />
                {isUploadingLogo ? "Uploading…" : "Upload logo"}
              </span>
            </label>
          </div>

          <div className="min-w-0 flex-1 space-y-4">
            <div className="space-y-2">
              <Label className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                Shop name
              </Label>
              <Input
                value={shop.shopName}
                onChange={(e) => update("shopName", e.target.value)}
                placeholder="My shop"
                className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 font-semibold text-slate-900"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                Description
              </Label>
              <Textarea
                value={shop.description}
                onChange={(e) => update("description", e.target.value)}
                rows={4}
                placeholder="Tell customers what you sell…"
                className="rounded-2xl border-slate-100 bg-slate-50/50 font-medium text-slate-900"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Shipping & pickup */}
      <section className="space-y-6 rounded-[2rem] border border-slate-100 bg-white p-8 shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50">
            <MapPin className="h-5 w-5 text-sky-700" />
          </div>
          <div>
            <h2 className="text-base font-black text-slate-900">Shipping &amp; pickup</h2>
            <p className="text-xs text-slate-500">Where buyers can collect orders</p>
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
            Pickup address
          </Label>
          <Textarea
            value={shop.pickupAddress}
            onChange={(e) => update("pickupAddress", e.target.value)}
            rows={3}
            placeholder="Building, street, district, city…"
            className="rounded-2xl border-slate-100 bg-slate-50/50 font-medium text-slate-900"
          />
        </div>
      </section>

      {/* Bank */}
      <section className="space-y-6 rounded-[2rem] border border-slate-100 bg-white p-8 shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50">
            <Landmark className="h-5 w-5 text-amber-800" />
          </div>
          <div>
            <h2 className="text-base font-black text-slate-900">Bank account</h2>
            <p className="text-xs text-slate-500">Payout details for your sales</p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Bank name
            </Label>
            <Input
              value={shop.bankName}
              onChange={(e) => update("bankName", e.target.value)}
              placeholder="e.g. Kasikorn Bank"
              className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 font-semibold text-slate-900"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Account number
            </Label>
            <Input
              value={shop.accountNumber}
              onChange={(e) => update("accountNumber", e.target.value)}
              className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 font-mono text-sm font-semibold text-slate-900"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Account holder
            </Label>
            <Input
              value={shop.accountHolder}
              onChange={(e) => update("accountHolder", e.target.value)}
              className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 font-semibold text-slate-900"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
