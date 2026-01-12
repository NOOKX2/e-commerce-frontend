'use client'

import { useRouter, useSearchParams } from 'next/navigation';

export default function Pagination({ meta }: { meta: any }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;
    const totalPage = meta.total_pages;

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', newPage.toString());
        router.push(`?${params.toString()}`);
    }

    const renderPageNumbers = () => {
        const pages = [];
        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPage, currentPage + 2);

        for(let i=startPage ; i <= endPage ; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                   className={`px-4 py-2 border rounded-md transition-colors ${
                        currentPage === i ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'
                    }`}
                >
                    {i}

                </button>
            );
        }
        return pages;
    }

    return (
        <div className="flex items-center justify-center space-x-2 mt-8">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1} className='px-4 py-2 border rounded-md disabled:opacity-30 bg-gray-100'>
                Prev
          </button>
          {renderPageNumbers()}

          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPage} className='px-4 py-2 border rounded-md disabled:opacity-30 bg-gray-100'>Next</button>
        </div>
    );
}