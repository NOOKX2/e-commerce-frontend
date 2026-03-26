'use client';

import { PlusCircle } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { SellerTableToolbar } from '../../_components/SellerToolbar';

function SellerProductHeader() {
    const router = useRouter();


    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full">
               <SellerTableToolbar placeholder='Search by product name...'/>
            </div>

            <div className="flex w-full gap-3 sm:w-auto">
                <Button
                    type="button"
                    className="h-10 flex-1 rounded-2xl bg-blue-600 text-white shadow-sm hover:bg-blue-700 sm:flex-none"
                    onClick={() => router.push("/seller/products/new")}
                >
                    <PlusCircle className="h-4 w-4" />
                    Add product
                </Button>
            </div>
        </div>
    )
}

export default SellerProductHeader
