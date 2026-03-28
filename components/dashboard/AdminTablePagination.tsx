"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";

export type AdminListMeta = {
  total_pages: number;
  current_page: number;
  total?: number;
  limit?: number;
};

export default function AdminTablePagination({ meta }: { meta: AdminListMeta }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newPage <= 1) params.delete("page");
    else params.set("page", String(newPage));
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  };

  const { current_page, total_pages } = meta;
  if (total_pages <= 1) return null;

  return (
    <div className="border-t border-neutral-100 bg-neutral-50/80 px-6 py-4 sm:px-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-neutral-600">
          Page <span className="font-medium text-slate-900">{current_page}</span> of{" "}
          <span className="font-medium text-slate-900">{total_pages}</span>
          {meta.total != null ? (
            <>
              {" "}
              (<span className="font-medium text-slate-900">{meta.total}</span> total)
            </>
          ) : null}
        </p>
        <div className="flex items-center justify-center gap-2 sm:justify-end">
          <Button
            type="button"
            variant="secondary"
            className="h-9 rounded-full bg-white px-4 text-sm font-medium text-slate-900 shadow-sm hover:bg-neutral-100"
            onClick={() => handlePageChange(current_page - 1)}
            disabled={current_page <= 1}
          >
            Previous
          </Button>
          <span className="rounded-full bg-blue-600 px-4 py-1.5 text-sm font-semibold text-white shadow-sm">
            {current_page}
          </span>
          <Button
            type="button"
            variant="secondary"
            className="h-9 rounded-full bg-white px-4 text-sm font-medium text-slate-900 shadow-sm hover:bg-neutral-100"
            onClick={() => handlePageChange(current_page + 1)}
            disabled={current_page >= total_pages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
