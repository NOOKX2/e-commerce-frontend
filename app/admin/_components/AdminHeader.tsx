"use client";

import ProfileIcon from "@/components/shared/ProfileIcon";
import { Bell } from "lucide-react";

import { useAdminBatchPendingSafe } from "./AdminBatchPendingContext";
import { cn } from "@/lib/utils";

export default function AdminHeader() {
  const batch = useAdminBatchPendingSafe();
  const pending = batch?.pendingCount ?? 0;

  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-8">
      <div className="flex min-w-0 flex-1 items-center gap-4">
        {pending > 0 ? (
          <div
            className={cn(
              "flex max-w-full items-center gap-2 rounded-full border border-blue-200 bg-blue-50/90 px-4 py-1.5 text-sm shadow-sm"
            )}
          >
            <span className="font-semibold tabular-nums text-blue-700">{pending}</span>
            <span className="truncate font-medium text-blue-800">
              {pending === 1 ? "unsaved status change" : "unsaved status changes"}
            </span>
          </div>
        ) : (
          <div className="h-8 w-full max-w-md" aria-hidden />
        )}
      </div>

      <div className="flex shrink-0 items-center space-x-4">
        <button
          type="button"
          className="relative rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-500"
        >
          <span className="sr-only">View notifications</span>
          <Bell className="h-6 w-6" />
          <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        <ProfileIcon />
      </div>
    </header>
  );
}
