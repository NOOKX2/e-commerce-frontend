'use client'
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import Link from 'next/link';

function CartIcon() {
    const items = useCartStore((state) => state.items);
    const totalItems = items.reduce((total, item) => total + item.quantity, 0)

    return (
        <Link href="/cart" className='relative flex items-center'>
            <ShoppingCart className='size-10'/>

            {totalItems > 0 && (
                <span className='absolute -top-2 -right-3 flex h-5 w-5 
          items-center justify-center rounded-full 
          bg-primary text-xs text-primary-foreground'>
            {totalItems}
          </span>
            )}
        </Link>
    )
}

export default CartIcon
