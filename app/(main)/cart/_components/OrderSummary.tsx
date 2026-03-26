import { CartItem } from "@/lib/cart-store";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface OrderSummaryProps {
    items: CartItem[];
}

function OrderSummary({ items }: OrderSummaryProps) {
    const subtotal = items.reduce((total, item) => {
        return total + item.product.price * item.quantity;
    }, 0);

    return (
        <div className="glass-card sticky top-24 p-6">
            <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>
            <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>{`฿${subtotal.toLocaleString()}`}</span>
            </div>
            <div className="flex justify-between mb-4 text-muted-foreground">
                <span>Shipping</span>
                <span>Calculated at next step</span>
            </div>
            <div className="flex justify-between border-t border-black/5 pt-4 text-lg font-semibold">
                <span>Total</span>
                <span>{`฿${subtotal.toLocaleString()}`}</span>
            </div>
            <Button asChild className="mt-6 w-full rounded-full">
                <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
        </div>

    )
}

export default OrderSummary
