"use client";

import { usePathname, useSearchParams, useRouter} from "next/navigation";


interface PaginationMeta {
    total_pages: number;
    current_page: number;
    total_items?: number;
}

interface SellerProductTablePaginationProps {
    meta: PaginationMeta;
}

function SellerProductTablePagination({meta}: SellerProductTablePaginationProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', newPage.toString());
        router.push(`${pathname}?${params.toString()}`);
    };

    const { current_page, total_pages } = meta;

    return (
        <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
            <div className="flex items-center justify-between">
                {/* Mobile View */}
                <div className="flex-1 flex justify-between sm:hidden">
                    <button
                        onClick={() => handlePageChange(current_page - 1)}
                        disabled={current_page <= 1}
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => handlePageChange(current_page + 1)}
                        disabled={current_page >= total_pages}
                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>

                {/* Desktop View */}
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Page <span className="font-medium">{current_page}</span> of{" "}
                            <span className="font-medium">{total_pages}</span>
                        </p>
                    </div>
                    <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                            <button
                                onClick={() => handlePageChange(current_page - 1)}
                                disabled={current_page <= 1}
                                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                            >
                                Previous
                            </button>

                            {/* แสดงเลขหน้าแบบง่าย (คุณสามารถทำลูปเพื่อแสดงเลข 1, 2, 3... ได้ที่นี่) */}
                            <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600 z-10">
                                {current_page}
                            </span>

                            <button
                                onClick={() => handlePageChange(current_page + 1)}
                                disabled={current_page >= total_pages}
                                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                            >
                                Next
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SellerProductTablePagination
