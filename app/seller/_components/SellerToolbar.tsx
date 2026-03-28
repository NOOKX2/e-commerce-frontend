"use client";

import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTransition, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ToolbarProps {
  placeholder?: string;
  searchParamKey?: string;
  /** Show the Filter button (only when wired to real filters). Default: false */
  showFilterButton?: boolean;
}

export function SellerTableToolbar({
  placeholder = "Search...",
  searchParamKey = "search",
  showFilterButton = false,
}: ToolbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const fromUrl = searchParams.get(searchParamKey) ?? "";
  const [searchValue, setSearchValue] = useState(fromUrl);

  useEffect(() => {
    setSearchValue(fromUrl);
  }, [fromUrl]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      startTransition(() => {
        const params = new URLSearchParams(
          typeof window !== "undefined" ? window.location.search : ""
        );
        if (searchValue.trim()) {
          params.set(searchParamKey, searchValue.trim());
          params.set("page", "1");
        } else {
          params.delete(searchParamKey);
          params.set("page", "1");
        }
        const qs = params.toString();
        router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
      });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue, pathname, router, searchParamKey]);

  return (
    <div className="flex flex-col gap-4 rounded-3xl border-none bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
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
          placeholder={placeholder}
          className="w-full rounded-2xl bg-neutral-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 shadow-inner outline-none ring-0 transition-all placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-blue-500/25"
        />
      </div>

      {showFilterButton ? (
        <Button
          type="button"
          variant="secondary"
          className="h-10 w-full shrink-0 rounded-2xl bg-neutral-100 font-medium text-slate-900 shadow-none hover:bg-neutral-200/80 sm:w-auto"
        >
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      ) : null}
    </div>
  );
}
