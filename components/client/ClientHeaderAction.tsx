'use client'

import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import ProfileIcon from '@/components/client/ProfileIcon';
import { Search } from 'lucide-react';

const DynamicCartIcon = dynamic(
  () => import('./CartIcon'),
  { ssr: false, loading: () => <div className='h-6 w-6' /> }
)

function ClientHeaderAction() {
  return (
    <ul className='flex items-center justify-center gap-2 md:gap-6'>
      <li>
        <Button variant="ghost" size="icon" aria-label='Search' />
      </li>
      <li>
        <Search />
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
