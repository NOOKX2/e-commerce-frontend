import { CartItem } from "@/lib/cart-store";

interface OrderSummaryProps {
    items: CartItem[];
}

function OrderSummaryCheckout({ items }: OrderSummaryProps) {
    console.log("items in order summary props", items);
    const subtotal = items.reduce((total, item) => {
        return total + item.product.price * item.quantity;
    }, 0);

    return (
        <div className="sticky top-24 rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>{`฿${subtotal.toLocaleString()}`}</span>
            </div>
            <div className="flex justify-between mb-4 text-muted-foreground">
                <span>Shipping</span>
                <span>Calculated at next step</span>
            </div>
            <div className="border-t pt-4 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{`฿${subtotal.toLocaleString()}`}</span>
            </div>
        </div>

    )
}

export default OrderSummaryCheckout
