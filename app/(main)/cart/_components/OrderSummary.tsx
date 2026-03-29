"use client";

import { CartItem } from "@/lib/cart-store";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/context/auth-context";
import { isAccountSuspended, suspendedAccountMessage } from "@/lib/account-status";

interface OrderSummaryProps {
    items: CartItem[];
}

function OrderSummary({ items }: OrderSummaryProps) {
    const router = useRouter();
    const { user } = useAuth();

    const subtotal = items.reduce((total, item) => {
        return total + item.product.price * item.quantity;
    }, 0);

    const handleProceedToCheckout = () => {
        if (isAccountSuspended(user)) {
            toast.error(suspendedAccountMessage());
            return;
        }
        router.push("/checkout");
    };

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
            <Button
                type="button"
                className="mt-6 w-full rounded-full"
                onClick={handleProceedToCheckout}
            >
                Proceed to Checkout
            </Button>
        </div>

    )
}

export default OrderSummary
