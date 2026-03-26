import { CartItem } from "@/lib/cart-store";

interface OrderSummaryProps {
    items: CartItem[];
}

function OrderSummaryCheckout({ items }: OrderSummaryProps) {
    const subtotal = items.reduce((total, item) => {
        return total + item.product.price * item.quantity;
    }, 0);

    return (
        <div className="rounded-xl border border-black/5 bg-[#fafafa] p-5">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
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
        </div>

    )
}

export default OrderSummaryCheckout
