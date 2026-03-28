"use client";

import { Save, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type AdminUnifiedToolbarBatchProps = {
  hasChanges: boolean;
  isSaving: boolean;
  onSave: () => void;
  onReset?: () => void;
  /** Default: "Save All Changes" */
  saveLabel?: string;
};

type AdminUnifiedToolbarProps = {
  /** Search / filters (left side) */
  children: React.ReactNode;
  /** Highlight bar when there are unsaved batch edits */
  hasDirtyHighlight?: boolean;
  /** Save + optional Reset (right side). Omit for read-only lists (e.g. orders). */
  batchActions?: AdminUnifiedToolbarBatchProps;
  className?: string;
};

/**
 * Shared admin list toolbar: filters on the left, batch save on the right.
 * Used on Users, Products, Orders (orders typically omit `batchActions`).
 */
export default function AdminUnifiedToolbar({
  children,
  hasDirtyHighlight = false,
  batchActions,
  className,
}: AdminUnifiedToolbarProps) {
  const dirty = batchActions?.hasChanges ?? false;

  return (
    <div
      className={cn(
        "mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4",
        hasDirtyHighlight &&
          dirty &&
          batchActions &&
          "rounded-2xl border border-blue-200 px-3 py-3 ring-1 ring-blue-500/10 sm:px-4",
        className
      )}
    >
      <div className="flex min-w-0 w-full flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        {children}
      </div>

      {batchActions ? (
        <div className="flex w-full shrink-0 items-center justify-end gap-2 sm:w-auto sm:justify-start">
          {dirty && batchActions.onReset ? (
            <Button
              variant="ghost"
              size="sm"
              type="button"
              onClick={batchActions.onReset}
              disabled={batchActions.isSaving}
              className="rounded-xl text-xs font-bold text-slate-400 hover:text-red-500"
            >
              <RotateCcw className="mr-2 h-3.5 w-3.5" />
              Reset
            </Button>
          ) : null}
          <Button
            type="button"
            disabled={!dirty || batchActions.isSaving}
            onClick={batchActions.onSave}
            className={cn(
              "h-10 rounded-xl px-6 text-[11px] font-black uppercase tracking-tighter transition-all active:scale-95",
              dirty
                ? "bg-blue-600 text-white shadow-lg shadow-blue-200 hover:bg-blue-700"
                : "cursor-not-allowed border border-slate-100 bg-slate-50 text-slate-300"
            )}
          >
            <Save
              className={cn("mr-2 h-3.5 w-3.5", batchActions.isSaving && "animate-pulse")}
            />
            {batchActions.isSaving ? "Saving..." : batchActions.saveLabel ?? "Save All Changes"}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
