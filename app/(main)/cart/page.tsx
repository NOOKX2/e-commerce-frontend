'use client'

import { useCartStore } from "@/lib/cart-store";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CartItemList from "@/app/(main)/cart/_components/CartItemList";
import OrderSummary from "@/app/(main)/cart/_components/OrderSummary";

function CartPage() {
    const { items } = useCartStore()
    return (
        <div className="mx-auto w-full py-2 md:py-4">
            {items.length === 0 ? (
                <div className="glass-card mx-auto max-w-xl px-6 py-14 text-center">
                    <h1 className="text-3xl font-semibold tracking-tight">Your Cart is Empty</h1>
                    <p className="mt-3 text-sm text-muted-foreground md:text-base">
                        Looks like you haven&apos;t added anything to your cart yet.
                    </p>
                    <Button asChild className="mt-6 rounded-full px-7">
                        <Link href="/products">Start Shopping</Link>
                    </Button>
                </div>
            ) : (
                <div className="w-full py-4 md:py-8">
                    <h1 className="mb-6 text-3xl font-semibold tracking-tight md:mb-8">Your Cart</h1>
                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_360px]">
                        <div className="w-full">
                            <CartItemList items={items} />
                        </div>
                        <div className="w-full">
                            <OrderSummary items={items} />
                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}

export default CartPage
