"use client";

import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Settings2, Wallet, ShieldCheck } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormFieldLabel } from "@/components/dashboard/FormFieldLabel";
import SettingsSectionCard from "@/components/dashboard/SettingsSectionCard";
import SettingsStickyActionBar from "@/components/dashboard/SettingsStickyActionBar";
import SettingsToggleRow from "@/components/dashboard/SettingsToggleRow";
import { PlatformSettings } from "@/types/settings";

const CURRENCIES = ["THB", "USD", "EUR", "SGD", "JPY"] as const;

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
      <SettingsStickyActionBar
        title="Platform settings"
        description="Review changes before saving."
        saveLabel="Save all changes"
        hasChanges={hasChanges}
        isSaving={isSaving}
        onSave={handleSave}
      />

      <div className="space-y-6">
        <SettingsSectionCard
          title="Platform configuration"
          subtitle="Site identity and maintenance"
          icon={Settings2}
          iconWrapperClassName="bg-slate-50"
          iconClassName="text-slate-600"
        >
          <div className="space-y-6">
            <SettingsToggleRow
              id="maintenance"
              label="Maintenance mode"
              description="When enabled, consider showing a maintenance banner on the storefront (API: GET /v1/platform/public)."
              checked={settings.maintenanceMode}
              onCheckedChange={(v) => patch("maintenanceMode", v)}
            />
            <div className="space-y-2">
              <FormFieldLabel>Site name</FormFieldLabel>
              <Input
                value={settings.siteName}
                onChange={(e) => patch("siteName", e.target.value)}
                className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 px-4 font-semibold text-slate-900 focus:bg-white"
              />
            </div>
          </div>
        </SettingsSectionCard>

        <SettingsSectionCard
          title="Financial settings"
          subtitle="Commission and display currency"
          icon={Wallet}
          iconWrapperClassName="bg-emerald-50"
          iconClassName="text-emerald-700"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <FormFieldLabel>Commission rate (GP %)</FormFieldLabel>
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
              <FormFieldLabel>Primary currency</FormFieldLabel>
              <Select value={settings.currency} onValueChange={(v) => patch("currency", v)}>
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
        </SettingsSectionCard>

        <SettingsSectionCard
          title="Content moderation"
          subtitle="Product listing policy"
          icon={ShieldCheck}
          iconWrapperClassName="bg-violet-50"
          iconClassName="text-violet-700"
        >
          <SettingsToggleRow
            id="manual-approval"
            label="Manual product approval"
            description='When enabled, new seller products are created as "pending" until an admin activates them.'
            checked={settings.manualProductApproval}
            onCheckedChange={(v) => patch("manualProductApproval", v)}
          />
        </SettingsSectionCard>
      </div>
    </div>
  );
}
