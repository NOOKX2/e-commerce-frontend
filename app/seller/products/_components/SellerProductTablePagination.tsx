"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

/** Page/offset pagination (seller orders, customers) */
type PagePaginationMeta = {
    total_pages: number;
    current_page: number;
    total_items?: number;
};

/** Cursor pagination (seller products) */
type CursorPaginationMeta = {
    total_items?: number;
    limit?: number;
    next_cursor?: string | null;
    prev_cursor?: string | null;
    has_next?: boolean;
    has_prev?: boolean;
};

type SellerPaginationMeta = PagePaginationMeta | CursorPaginationMeta;

function isPageMeta(meta: SellerPaginationMeta): meta is PagePaginationMeta {
    return (
        "total_pages" in meta &&
        typeof (meta as PagePaginationMeta).total_pages === "number" &&
        "current_page" in meta &&
        typeof (meta as PagePaginationMeta).current_page === "number"
    );
}

interface SellerProductTablePaginationProps {
    meta: SellerPaginationMeta;
}

function SellerProductTablePagination({ meta }: SellerProductTablePaginationProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    if (isPageMeta(meta)) {
        const handlePageChange = (newPage: number) => {
            const params = new URLSearchParams(searchParams);
            params.set("page", newPage.toString());
            router.push(`${pathname}?${params.toString()}`);
        };

        const { current_page, total_pages } = meta;
        if (total_pages <= 1) return null;

        return (
            <div className="bg-neutral-50/80 px-6 py-5 sm:px-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-neutral-600">
                        Page{" "}
                        <span className="font-medium text-slate-900">{current_page}</span>
                        {" "}of{" "}
                        <span className="font-medium text-slate-900">{total_pages}</span>
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

    const pushCursors = (next: { cursor?: string; before?: string }) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("cursor");
        params.delete("before");
        if (next.cursor) params.set("cursor", next.cursor);
        if (next.before) params.set("before", next.before);
        router.push(`${pathname}?${params.toString()}`);
    };

    const hasPrev = Boolean(meta.has_prev && meta.prev_cursor);
    const hasNext = Boolean(meta.has_next && meta.next_cursor);

    if (!hasPrev && !hasNext) return null;

    return (
        <div className="bg-neutral-50/80 px-6 py-5 sm:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-neutral-600">
                    {meta.total_items != null ? (
                        <>
                            <span className="font-medium text-slate-900">{meta.total_items}</span> total
                        </>
                    ) : null}
                </p>
                <div className="flex items-center justify-center gap-2 sm:justify-end">
                    <Button
                        type="button"
                        variant="secondary"
                        className="h-9 rounded-full bg-white px-4 text-sm font-medium text-slate-900 shadow-sm hover:bg-neutral-100"
                        onClick={() => hasPrev && meta.prev_cursor && pushCursors({ before: meta.prev_cursor })}
                        disabled={!hasPrev}
                    >
                        Previous
                    </Button>
                    <Button
                        type="button"
                        variant="secondary"
                        className="h-9 rounded-full bg-white px-4 text-sm font-medium text-slate-900 shadow-sm hover:bg-neutral-100"
                        onClick={() => hasNext && meta.next_cursor && pushCursors({ cursor: meta.next_cursor })}
                        disabled={!hasNext}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default SellerProductTablePagination;
