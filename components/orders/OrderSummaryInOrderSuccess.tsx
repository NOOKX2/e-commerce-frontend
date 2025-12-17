import { OrderItem } from "@/types/order";

interface OrderSummaryProps {
    items: OrderItem[];
}

function OrderSummaryInOrderSuccess({ items }: OrderSummaryProps) {
    console.log("items in order summary props", items);
    const subtotal: number = items.reduce((total, item) => {
        return total + (item.priceAtPurchase * item.quantity);
    }, 0)
    
    return (
        <div className="sticky top-24 border-t px-6 pt-2">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>{`฿${subtotal.toLocaleString()}`}</span>
            </div>
            <div className="border-t pt-4 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{`฿${subtotal.toLocaleString()}`}</span>
            </div>
        </div>

    )
}

export default OrderSummaryInOrderSuccess
