"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { Building2, MapPin, Landmark, Upload } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormFieldLabel } from "@/components/dashboard/FormFieldLabel";
import SettingsSectionCard from "@/components/dashboard/SettingsSectionCard";
import SettingsStickyActionBar from "@/components/dashboard/SettingsStickyActionBar";
import { SellerShopSettings } from "@/types/settings";
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
      <SettingsStickyActionBar
        title="Store settings"
        description="Profile, pickup, and payout details for your shop."
        saveLabel="Save changes"
        hasChanges={hasChanges}
        isSaving={isSaving}
        onSave={handleSave}
      />

      <SettingsSectionCard
        title="Shop profile"
        subtitle="Name, description, and logo"
        icon={Building2}
        iconWrapperClassName="bg-slate-50"
        iconClassName="text-slate-700"
      >
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
              <FormFieldLabel>Shop name</FormFieldLabel>
              <Input
                value={shop.shopName}
                onChange={(e) => update("shopName", e.target.value)}
                placeholder="My shop"
                className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 font-semibold text-slate-900"
              />
            </div>
            <div className="space-y-2">
              <FormFieldLabel>Description</FormFieldLabel>
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
      </SettingsSectionCard>

      <SettingsSectionCard
        title="Shipping & pickup"
        subtitle="Where buyers can collect orders"
        icon={MapPin}
        iconWrapperClassName="bg-sky-50"
        iconClassName="text-sky-700"
      >
        <div className="space-y-2">
          <FormFieldLabel>Pickup address</FormFieldLabel>
          <Textarea
            value={shop.pickupAddress}
            onChange={(e) => update("pickupAddress", e.target.value)}
            rows={3}
            placeholder="Building, street, district, city…"
            className="rounded-2xl border-slate-100 bg-slate-50/50 font-medium text-slate-900"
          />
        </div>
      </SettingsSectionCard>

      <SettingsSectionCard
        title="Bank account"
        subtitle="Payout details for your sales"
        icon={Landmark}
        iconWrapperClassName="bg-amber-50"
        iconClassName="text-amber-800"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <FormFieldLabel>Bank name</FormFieldLabel>
            <Input
              value={shop.bankName}
              onChange={(e) => update("bankName", e.target.value)}
              placeholder="e.g. Kasikorn Bank"
              className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 font-semibold text-slate-900"
            />
          </div>
          <div className="space-y-2">
            <FormFieldLabel>Account number</FormFieldLabel>
            <Input
              value={shop.accountNumber}
              onChange={(e) => update("accountNumber", e.target.value)}
              className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 font-mono text-sm font-semibold text-slate-900"
            />
          </div>
          <div className="space-y-2">
            <FormFieldLabel>Account holder</FormFieldLabel>
            <Input
              value={shop.accountHolder}
              onChange={(e) => update("accountHolder", e.target.value)}
              className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 font-semibold text-slate-900"
            />
          </div>
        </div>
      </SettingsSectionCard>
    </div>
  );
}
