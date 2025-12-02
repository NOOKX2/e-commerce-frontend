'use client'

import { useCartStore } from "@/lib/cart-store";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CartItemList from "@/components/client/CartItemList";
import OrderSummary from "@/components/client/OrderSummary";

function CartPage() {
    const { items} = useCartStore()
    console.log(items)
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
                <div className="container mx-auto px-4 md:px-6 py-10">
                    <h1 className="text-3xl font-bold mb-8 ">Your Cart</h1>
                    <div className="flex flex-col lg:flex-row gap-45">
                        <div className="w-full">
                             <CartItemList items={items}/>
                        </div>
                        <div className="w-full">
                            <OrderSummary items={items}/>
                        </div>
                        
                    </div>
                </div>
            )}
        </div>
    )
}

export default CartPage
