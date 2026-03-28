import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Shared page title + subtitle for Seller Center and Admin (same typography). */
export default function WorkspacePageHeader({
  title,
  description,
  actions,
  className,
}: {
  title: string;
  description?: string;
  /** e.g. toolbar buttons (dashboard report, export) */
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between",
        className
      )}
    >
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">{title}</h1>
        {description ? (
          <p className="mt-2 text-sm font-medium text-neutral-500">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap items-center gap-3">{actions}</div> : null}
    </div>
  );
}
