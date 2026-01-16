"use client";

import { useState } from 'react';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Label } from '../ui/label';
import StripeInput from './StripeInput';
import { useCartStore } from '@/lib/cart-store';
import { useRouter } from 'next/navigation';
import { ShippingAddressData } from '@/types/shippingAdressData';

interface StripeCheckoutFormProps {
    shippingAddress: ShippingAddressData;
}

export default function StripeCheckoutForm({shippingAddress}: StripeCheckoutFormProps) {
    const {items, clearCart} = useCartStore();
    console.log("item in checkout", items);
    const stripe = useStripe();
    const elements = useElements();
    const router = useRouter();

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!shippingAddress) {
            setError("Please provide a shipping address.");
            return;
        }

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);
        setError(null);

        const cardNumberElement = elements.getElement(CardNumberElement);
        if (!cardNumberElement) {
            setIsLoading(false);
            setError("Card number element not found");
            return;
        }

        const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardNumberElement,
        });

        if (stripeError) {
            setError(stripeError.message || "An error occurred");
            setIsLoading(false);
            return;
        }
        
        setError(null);
        console.log("Payment Token:", paymentMethod);
        alert("สร้าง Token สำเร็จ! (ดูใน Console)");
        setIsLoading(false);

        try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_API_URL}/v1/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                credentials: 'include',
                cache: 'no-store',
                body: JSON.stringify({
                    shippingAddress: shippingAddress,
                    items: items.map(item => ({ productID: item.product.ID, quantity: item.quantity })),
                    paymentIntentId: paymentMethod.id,
                }),
            });
       
            const orderData = await res.json();
            console.log(orderData);
            if (!res.ok) {
                console.log(orderData.error);
                throw new Error(orderData.error || "Failed to create your order.")
            }

             
            clearCart();
            setIsPaymentSuccessful(true);
            router.push(`/orders/success/${orderData.order.ID}`);

        }catch(error: any) {
            setError(error.message)
        } finally {
            setIsLoading(false);
        }
        

    };

    if (isPaymentSuccessful) {
        return <div className="text-green-600 font-bold text-center text-2xl">Payment Successful!</div>;
    }


    const cartElementOptions = {
        style: {
            base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                    color: '#aab7c4',
                },
            },
            invalid: {
                color: '#9e2146',
            },
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className='space-y-4'>
                <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <StripeInput>
                        <CardNumberElement id="cardNumber" options={cartElementOptions} />
                    </StripeInput>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                    <div>
                        <Label htmlFor="cardExpiry">Expiration Date</Label>
                        <StripeInput>
                            <CardExpiryElement id="cardExpiry" options={cartElementOptions} />
                        </StripeInput>
                    </div>
                    <div>
                        <Label htmlFor="cardCvc">CVC</Label>
                        <StripeInput>
                            <CardCvcElement id="cardCvc" options={cartElementOptions} />
                        </StripeInput>
                    </div>
                </div>
            </div>

            {error && <div className="text-red-500 mt-4 text-sm">{error}</div>}

            <Button type='submit' disabled={!stripe || isLoading} className='w-full mt-6'>
                {isLoading ? 'Processing...': 'Pay Now'}
            </Button>

        </form>
    )
}