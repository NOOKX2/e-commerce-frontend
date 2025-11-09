'use client'

import { useCartStore } from "@/lib/cart-store";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CartItemList from "@/components/client/cart-item-list";
import OrderSummary from "@/components/client/order-summary";

function CartPage() {
    const { items} = useCartStore()

    return (
        <div className="mx-auto py-12">
            {items.length === 0 ? (
                <div className="text-center">
                    <h1 className="text-3xl font-bold">Your Cart is Empty</h1>
                    <p className="mt-4 text-muted-foreground">
                        Looks like you haven't added anything to your cart yet.
                    </p>
                    <Button asChild className="mt-6">
                        <Link href="/products">Start Shopping</Link>
                    </Button>
                </div>
            ) : (
                <div className="mx-30 gap-5">
                    <h1 className="text-3xl font-bold mb-8 ">Your Cart</h1>
                    <div className="flex flex-col lg:flex-row gap-12">
                       <CartItemList items={items}/>
                        <OrderSummary items={items}/>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CartPage
