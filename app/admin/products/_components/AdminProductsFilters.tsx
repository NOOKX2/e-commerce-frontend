"use client";

import { useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import AdminSearchParamInput from "@/components/dashboard/AdminSearchParamInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const STATUSES = [
  { value: "all", label: "All statuses" },
  { value: "active", label: "Active" },
  { value: "pending", label: "Pending" },
  { value: "inactive", label: "Inactive" },
  { value: "draft", label: "Draft" },
  { value: "archived", label: "Archived" },
] as const;

type StatusOption = (typeof STATUSES)[number]["value"];

const STATUS_SET = new Set<string>(
  STATUSES.filter((row) => row.value !== "all").map((row) => row.value)
);

function normalizeStatus(raw: string | null): StatusOption | "" {
  const s = (raw ?? "").trim().toLowerCase();
  if (!STATUS_SET.has(s)) return "";
  return s as StatusOption;
}

/** Search + status filter for admin products (URL: `search`, `status`). */
export default function AdminProductsFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const statusFromUrl = normalizeStatus(searchParams.get("status"));
  const statusSel = statusFromUrl || "all";

  function setStatus(next: string) {
    startTransition(() => {
      const params = new URLSearchParams(
        typeof window !== "undefined" ? window.location.search : searchParams.toString()
      );
      if (next && next !== "all") params.set("status", next.toLowerCase());
      else params.delete("status");
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    });
  }

  return (
    <div className="flex w-full min-w-0 flex-col gap-3 sm:flex-1 sm:flex-row sm:items-center sm:gap-4">
      <AdminSearchParamInput placeholder="Search by name or SKU..." />
      <div className="flex w-full shrink-0 items-center gap-3 sm:w-auto">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
          Status
        </span>
        <Select value={statusSel} onValueChange={setStatus}>
          <SelectTrigger className="h-10 w-full min-w-[160px] rounded-2xl border-slate-200 sm:w-[200px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {STATUSES.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
