'use client';

import AddProductModal from '@/app/seller/products/_components/AddProductMotal';
import { Filter, PlusCircle, Search } from 'lucide-react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


function SellerProductHeader() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [inputValue, setInputValue] = useState(searchParams.get('search') || "");
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (inputValue === (searchParams.get('search') || "")) return;
        const timer = setTimeout(() => {
            const params = new URLSearchParams(searchParams);
            console.log("input value", inputValue);
            if (inputValue) {
                params.set('search', inputValue);
            } else {
                params.delete('search');
            }
            params.set('page', '1');

            router.push(`${pathname}?${params.toString()}`);
        }, 300);


        return () => clearTimeout(timer);
    }, [inputValue, searchParams, pathname, router]);

    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="relative w-full sm:w-96">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="Search products..."
                    className="pl-10 pr-4 py-2.5 w-full border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
            </div>

            <div className="flex gap-3 w-full sm:w-auto">
                <button className="flex items-center justify-center px-4 py-2.5 border border-gray-200 text-gray-700 bg-white rounded-xl hover:bg-gray-50 font-medium transition-colors flex-1 sm:flex-none">
                    <Filter className="h-5 w-5 mr-2" />
                    Filter
                </button>
                <button onClick={() => setIsModalOpen(true)} className="flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium shadow-sm shadow-blue-200 transition-all flex-1 sm:flex-none">
                    <PlusCircle className="h-5 w-5 mr-2" />
                    Add Product
                </button>
            </div>
            <AddProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

        </div>
    )
}

export default SellerProductHeader
