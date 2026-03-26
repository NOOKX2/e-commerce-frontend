"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Filter as FilterIcon, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { Category } from "@/types/product";
import { cn } from "@/lib/utils";

function parseCategoryParam(raw: string | null): Set<string> {
  if (!raw) return new Set();
  return new Set(
    raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
  );
}

export function Filter({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selected = useMemo(
    () => parseCategoryParam(searchParams.get("category")),
    [searchParams]
  );

  const handleCategoryChange = (categoryId: number, checked: boolean) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.delete("page");

    const idStr = String(categoryId);
    const next = new Set(selected);

    if (checked) next.add(idStr);
    else next.delete(idStr);

    if (next.size > 0) {
      currentParams.set("category", [...next].sort().join(","));
    } else {
      currentParams.delete("category");
    }

    const qs = currentParams.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const clearCategories = () => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.delete("category");
    currentParams.delete("page");
    const qs = currentParams.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  return (
    <aside
      className={cn(
        "glass-card flex flex-col gap-5 p-4 md:p-5",
        "lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto"
      )}
    >
      <div className="flex items-start justify-between gap-2 border-b border-black/5 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <FilterIcon className="h-4 w-4" aria-hidden />
          </span>
          <div>
            <h2 className="text-base font-semibold tracking-tight md:text-lg">
              Filters
            </h2>
            <p className="text-xs text-muted-foreground">Refine by category</p>
          </div>
        </div>
        {selected.size > 0 ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 shrink-0 gap-1 px-2 text-xs text-muted-foreground hover:text-foreground"
            onClick={clearCategories}
          >
            <X className="h-3.5 w-3.5" />
            Clear
          </Button>
        ) : null}
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between px-0.5">
          <h3 className="text-sm font-medium text-foreground">Category</h3>
          {selected.size > 0 ? (
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium tabular-nums text-primary">
              {selected.size} selected
            </span>
          ) : null}
        </div>

        {categories.length === 0 ? (
          <p className="px-0.5 py-6 text-center text-sm text-muted-foreground">
            No categories available yet.
          </p>
        ) : (
          <ul className="flex flex-col gap-0.5">
            {categories.map((category) => {
              const id = `category-${category.id}`;
              const isChecked = selected.has(String(category.id));
              return (
                <li key={category.id}>
                  <div
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-2 py-2.5 transition-colors",
                      "hover:bg-black/3",
                      isChecked && "bg-primary/5 ring-1 ring-primary/15"
                    )}
                  >
                    <Checkbox
                      id={id}
                      checked={isChecked}
                      onCheckedChange={(checked) =>
                        handleCategoryChange(category.id, !!checked)
                      }
                    />
                    <Label
                      htmlFor={id}
                      className="flex flex-1 cursor-pointer flex-col gap-0 leading-snug"
                    >
                      <span className="text-sm font-medium">{category.name}</span>
                      <span className="text-[11px] text-muted-foreground">
                        {category.slug}
                      </span>
                    </Label>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </aside>
  );
}
