'use client'

import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import ProfileIcon from '@/components/shared/ProfileIcon';
import { Search } from 'lucide-react';
import Link from 'next/link';

const DynamicCartIcon = dynamic(
  () => import('../cart/CartIcon'),
  { ssr: false, loading: () => <div className="h-11 w-11" aria-hidden /> }
)

function ClientHeaderAction() {
  return (
    <ul className="flex items-center gap-2 md:gap-4">
      <li>
        <Button
          asChild
          variant="ghost"
          size="icon"
          aria-label="Search products"
          className="h-11 w-11 rounded-full text-neutral-800 hover:bg-neutral-100 hover:text-neutral-900 md:h-12 md:w-12"
        >
          <Link href="/products" className="flex size-full items-center justify-center">
            <Search className="size-6 shrink-0 md:size-7" strokeWidth={2.25} aria-hidden />
          </Link>
        </Button>
      </li>
      <li>
        <DynamicCartIcon />
      </li>

      <li>
        <ProfileIcon />
      </li>
    </ul>
  )
}

export default ClientHeaderAction
