"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const ROLE_VALUES = new Set(["buyer", "seller", "admin"]);

const ROLES = [
  { value: "all", label: "All roles" },
  { value: "buyer", label: "Buyer" },
  { value: "seller", label: "Seller" },
  { value: "admin", label: "Admin" },
] as const;

function normalizeRoleParam(raw: string | null): string {
  const s = (raw ?? "").trim().toLowerCase();
  return ROLE_VALUES.has(s) ? s : "";
}

/** Search + role controls for the admin users unified toolbar (left side). */
export default function AdminUsersFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const roleFromUrl = normalizeRoleParam(searchParams.get("role"));
  const roleSelectValue = roleFromUrl || "all";
  const searchFromUrl = searchParams.get("search") ?? "";

  const [searchValue, setSearchValue] = useState(searchFromUrl);

  useEffect(() => {
    setSearchValue(searchFromUrl);
  }, [searchFromUrl]);

  useEffect(() => {
    const t = setTimeout(() => {
      startTransition(() => {
        const params = new URLSearchParams(
          typeof window !== "undefined" ? window.location.search : ""
        );
        const trimmed = searchValue.trim();
        const currentSearch = params.get("search") ?? "";
        if (trimmed === currentSearch) return;
        if (trimmed) params.set("search", trimmed);
        else params.delete("search");
        params.delete("page");
        const qs = params.toString();
        router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
      });
    }, 450);
    return () => clearTimeout(t);
  }, [searchValue, pathname, router]);

  function setRole(role: string) {
    startTransition(() => {
      const params = new URLSearchParams(
        typeof window !== "undefined" ? window.location.search : searchParams.toString()
      );
      if (role && role !== "all") params.set("role", role.toLowerCase());
      else params.delete("role");
      params.delete("page");
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    });
  }

  return (
    <div className="flex w-full min-w-0 flex-col gap-3 sm:flex-1 sm:flex-row sm:items-center sm:gap-4">
      <div className="relative w-full sm:max-w-md">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search
            className={cn(
              "h-5 w-5",
              isPending ? "animate-pulse text-blue-500" : "text-neutral-400"
            )}
          />
        </div>
        <input
          type="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full rounded-2xl bg-neutral-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 shadow-inner outline-none ring-0 transition-all placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-blue-500/25"
        />
      </div>

      <div className="flex w-full shrink-0 items-center gap-3 sm:w-auto">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
          Role
        </span>
        <Select value={roleSelectValue} onValueChange={setRole}>
          <SelectTrigger className="h-10 w-full min-w-[160px] rounded-2xl border-slate-200 sm:w-[200px]">
            <SelectValue placeholder="Filter role" />
          </SelectTrigger>
          <SelectContent>
            {ROLES.map((r) => (
              <SelectItem key={r.value} value={r.value}>
                {r.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
