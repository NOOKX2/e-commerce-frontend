"use client";

import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Save, Settings2, Wallet, ShieldCheck } from "lucide-react";

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
import { PlatformSettings } from "@/types/settings";
import { cn } from "@/lib/utils";

const CURRENCIES = ["THB", "USD", "EUR", "SGD", "JPY"] as const;

function ToggleRow({
  id,
  label,
  description,
  checked,
  onCheckedChange,
}: {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-6 py-2">
      <div>
        <Label htmlFor={id} className="text-sm font-bold text-slate-900">
          {label}
        </Label>
        <p className="mt-1 text-xs text-slate-500 leading-relaxed">{description}</p>
      </div>
      <label className="relative inline-flex cursor-pointer items-center shrink-0">
        <input
          id={id}
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          onChange={(e) => onCheckedChange(e.target.checked)}
        />
        <div className="peer h-7 w-12 rounded-full bg-slate-200 transition-colors peer-checked:bg-blue-600 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500/30 after:absolute after:top-0.5 after:left-0.5 after:h-6 after:w-6 after:rounded-full after:bg-white after:shadow-sm after:transition-all peer-checked:after:translate-x-5" />
      </label>
    </div>
  );
}

export default function AdminSettingsClient({
  initialSettings,
}: {
  initialSettings: PlatformSettings;
}) {
  const [settings, setSettings] = useState<PlatformSettings>(initialSettings);
  const [isSaving, setIsSaving] = useState(false);

  const hasChanges = useMemo(
    () => JSON.stringify(settings) !== JSON.stringify(initialSettings),
    [settings, initialSettings]
  );

  const patch = <K extends keyof PlatformSettings>(key: K, value: PlatformSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/v1/admin/settings/platform`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            maintenanceMode: settings.maintenanceMode,
            siteName: settings.siteName,
            commissionRate: settings.commissionRate,
            currency: settings.currency,
            manualProductApproval: settings.manualProductApproval,
          }),
        }
      );
      if (!res.ok) throw new Error("save failed");
      toast.success("All changes saved");
      window.location.reload();
    } catch {
      toast.error("Could not save settings");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-12">
      <div
        className={cn(
          "sticky top-0 z-40 flex items-center justify-between rounded-4xl border bg-white/80 p-4 backdrop-blur-md transition-all duration-300",
          hasChanges
            ? "border-blue-200 shadow-md ring-4 ring-blue-500/5"
            : "border-slate-100 shadow-sm"
        )}
      >
        <div className="ml-2">
          <h1 className="text-lg font-black tracking-tight text-slate-900">Platform settings</h1>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Admin configuration
          </p>
        </div>
        <Button
          disabled={!hasChanges || isSaving}
          onClick={handleSave}
          className={cn(
            "h-10 rounded-xl px-8 text-[11px] font-black uppercase tracking-widest transition-all active:scale-95",
            hasChanges
              ? "bg-blue-600 text-white shadow-lg shadow-blue-200 hover:bg-blue-700"
              : "cursor-not-allowed border border-slate-100 bg-slate-50 text-slate-300"
          )}
        >
          <Save className={cn("mr-2 h-4 w-4", isSaving && "animate-pulse")} />
          {isSaving ? "Saving…" : "Save all changes"}
        </Button>
      </div>

      <div className="space-y-6">
        {/* Platform Configuration */}
        <section className="rounded-4xl border border-slate-100 bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center gap-3 border-b border-slate-50 pb-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50">
              <Settings2 className="h-5 w-5 text-slate-600" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900">Platform configuration</h2>
              <p className="text-xs text-slate-500">Site identity and maintenance</p>
            </div>
          </div>
          <div className="space-y-6">
            <ToggleRow
              id="maintenance"
              label="Maintenance mode"
              description="When enabled, consider showing a maintenance banner on the storefront (API: GET /v1/platform/public)."
              checked={settings.maintenanceMode}
              onCheckedChange={(v) => patch("maintenanceMode", v)}
            />
            <div className="space-y-2">
              <Label className="ml-1 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                Site name
              </Label>
              <Input
                value={settings.siteName}
                onChange={(e) => patch("siteName", e.target.value)}
                className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 px-4 font-semibold text-slate-900 focus:bg-white"
              />
            </div>
          </div>
        </section>

        {/* Financial */}
        <section className="rounded-4xl border border-slate-100 bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center gap-3 border-b border-slate-50 pb-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50">
              <Wallet className="h-5 w-5 text-emerald-700" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900">Financial settings</h2>
              <p className="text-xs text-slate-500">Commission and display currency</p>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="ml-1 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                Commission rate (GP %)
              </Label>
              <Input
                type="number"
                min={0}
                max={100}
                step={0.1}
                value={settings.commissionRate}
                onChange={(e) => patch("commissionRate", parseFloat(e.target.value) || 0)}
                className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 px-4 font-semibold tabular-nums text-slate-900 focus:bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="ml-1 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                Primary currency
              </Label>
              <Select
                value={settings.currency}
                onValueChange={(v) => patch("currency", v)}
              >
                <SelectTrigger className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 font-semibold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {CURRENCIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Moderation */}
        <section className="rounded-4xl border border-slate-100 bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center gap-3 border-b border-slate-50 pb-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50">
              <ShieldCheck className="h-5 w-5 text-violet-700" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900">Content moderation</h2>
              <p className="text-xs text-slate-500">Product listing policy</p>
            </div>
          </div>
          <ToggleRow
            id="manual-approval"
            label="Manual product approval"
            description="When enabled, new seller products are created as “pending” until an admin activates them."
            checked={settings.manualProductApproval}
            onCheckedChange={(v) => patch("manualProductApproval", v)}
          />
        </section>
      </div>
    </div>
  );
}
