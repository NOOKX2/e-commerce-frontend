'use client'
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import Link from 'next/link';

function CartIcon() {
    const items = useCartStore((state) => state.items);
    const totalItems = items.reduce((total, item) => total + item.quantity, 0)

    return (
        <Link
            href="/cart"
            className="relative flex h-11 w-11 items-center justify-center rounded-full text-neutral-800 transition-colors hover:bg-neutral-100 hover:text-neutral-900 md:h-12 md:w-12"
            aria-label="Shopping cart"
        >
            <ShoppingCart className="size-6 shrink-0 md:size-7" strokeWidth={2.25} aria-hidden />

            {totalItems > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-medium tabular-nums text-primary-foreground">
                    {totalItems > 99 ? '99+' : totalItems}
                </span>
            )}
        </Link>
    )
}

export default CartIcon
