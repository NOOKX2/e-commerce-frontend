import { Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Sticky save bar for settings / long forms (admin + seller). */
export default function SettingsStickyActionBar({
  title,
  description,
  saveLabel,
  savingLabel,
  hasChanges,
  isSaving,
  onSave,
  disabled,
  className,
}: {
  title: string;
  description?: string;
  saveLabel: string;
  savingLabel?: string;
  hasChanges: boolean;
  isSaving: boolean;
  onSave: () => void;
  disabled?: boolean;
  className?: string;
}) {
  const saving = savingLabel ?? "Saving…";

  return (
    <div
      className={cn(
        "sticky top-0 z-30 flex flex-col gap-4 rounded-4xl border bg-white/90 p-4 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between",
        hasChanges
          ? "border-blue-200 shadow-md ring-4 ring-blue-500/5"
          : "border-slate-200/80 shadow-sm",
        className
      )}
    >
      <div>
        <h2 className="text-lg font-black tracking-tight text-slate-900">{title}</h2>
        {description ? (
          <p className="text-xs font-medium text-slate-500">{description}</p>
        ) : null}
      </div>
      <Button
        type="button"
        disabled={disabled || !hasChanges || isSaving}
        onClick={onSave}
        className={cn(
          "h-11 rounded-2xl px-8 text-[11px] font-black uppercase tracking-widest",
          hasChanges
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "cursor-not-allowed bg-slate-100 text-slate-400"
        )}
      >
        <Save className={cn("mr-2 h-4 w-4", isSaving && "animate-pulse")} />
        {isSaving ? saving : saveLabel}
      </Button>
    </div>
  );
}
