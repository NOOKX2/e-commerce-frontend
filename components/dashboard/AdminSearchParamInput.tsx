"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Debounced text search synced to the `search` query param (current path).
 */
export default function AdminSearchParamInput({
  placeholder = "Search...",
  className,
}: {
  placeholder?: string;
  className?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const searchFromUrl = searchParams.get("search") ?? "";
  const [value, setValue] = useState(searchFromUrl);

  useEffect(() => {
    setValue(searchFromUrl);
  }, [searchFromUrl]);

  useEffect(() => {
    const t = setTimeout(() => {
      startTransition(() => {
        const params = new URLSearchParams(
          typeof window !== "undefined" ? window.location.search : ""
        );
        const trimmed = value.trim();
        const current = params.get("search") ?? "";
        if (trimmed === current) return;
        if (trimmed) params.set("search", trimmed);
        else params.delete("search");
        const qs = params.toString();
        router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
      });
    }, 450);
    return () => clearTimeout(t);
  }, [value, pathname, router]);

  return (
    <div className={cn("relative w-full sm:max-w-md", className)}>
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
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl bg-neutral-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 shadow-inner outline-none ring-0 transition-all placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-blue-500/25"
      />
    </div>
  );
}
