'use client'

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Button } from '../ui/button';
import { CircleUserRound } from 'lucide-react';

function DynamicHeaderIcon() {
    const DynamicCartIcon = dynamic(
        () => import('@/components/client/cart-icon'),
        {
            ssr: false,
            loading: () => <div className="h-6 w-6" />
        }
    )
    return (
        <div className='flex items-center gap-4'>
            <DynamicCartIcon />
              <Link href='/profile'>
              <Button variant='ghost' size='icon-lg'>
                <CircleUserRound className="size-10" />
              </Button>
            </Link>
            <Link href="/login">Login</Link>
        </div>
    )
}

export default DynamicHeaderIcon
