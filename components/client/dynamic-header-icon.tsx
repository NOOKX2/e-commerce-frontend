'use client'

import dynamic from 'next/dynamic';

function DynamicHeaderIcon() {
    const DynamicCartIcon = dynamic(
        () => import('@/components/client/cart-icon'),
        {
            ssr: false,
            loading: () => <div className="h-6 w-6" />
        }
    )
    return (
        <div className='flex items-center gap-6'>
            <DynamicCartIcon />
        </div>
    )
}

export default DynamicHeaderIcon
