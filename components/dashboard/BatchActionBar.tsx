// @/components/dashboard/BatchActionBar.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Save, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface BatchActionBarProps {
  hasChanges: boolean;
  changedCount: number;
  isSaving: boolean;
  onSave: () => void;
  onReset: () => void;
  title?: string;
  subTitle?: string;
}

export default function BatchActionBar({
  hasChanges,
  changedCount,
  isSaving,
  onSave,
  onReset,
  title = "Management",
  subTitle = "Update and manage records across the platform",
}: BatchActionBarProps) {
  return (
    <div
      className={cn(
        "sticky top-[-30] z-40 flex items-center justify-between bg-white p-4 rounded-4xl border shadow-sm transition-all duration-300 mb-6",
        hasChanges 
          ? "border-blue-200 ring-4 ring-blue-500/5" 
          : "border-slate-100"
      )}
    >
      <div className="flex flex-col ml-2">
        <h2 className={cn(
            "text-xl font-bold ",
            hasChanges ? "text-blue-600" : "text-slate-900"
        )}>
          {hasChanges ? `Pending Changes: ${changedCount} items` : title}
        </h2>
        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">
          {subTitle}
        </p>
      </div>

      <div className="flex items-center gap-2">
        {hasChanges && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            disabled={isSaving}
            className="rounded-xl text-slate-400 hover:text-red-500 font-bold text-xs"
          >
            <RotateCcw className="h-3.5 w-3.5 mr-2" /> Reset
          </Button>
        )}
        <Button
          disabled={!hasChanges || isSaving}
          onClick={onSave}
          className={cn(
            "rounded-xl px-6 h-10 font-black text-[11px] uppercase tracking-tighter transition-all active:scale-95",
            hasChanges
              ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200"
              : "bg-slate-50 text-slate-300 border border-slate-100 cursor-not-allowed"
          )}
        >
          <Save className={cn("h-3.5 w-3.5 mr-2", isSaving && "animate-pulse")} />
          {isSaving ? "Saving..." : "Save All Changes"}
        </Button>
      </div>
    </div>
  );
}