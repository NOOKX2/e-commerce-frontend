"use client";

import { useState } from 'react';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Label } from '../ui/label';
import StripeInput from './StripeInput';


export default function StripeCheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);
        const cardNumberElement = elements.getElement(CardNumberElement);
        if (!cardNumberElement) {
            setIsLoading(false);
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardNumberElement,
        });

        if (error) {
            setError(error.message || "An error occurred");
            setIsLoading(false);
        }
        else {
            setError(null);
            console.log("Payment Token:", paymentMethod);
            alert("สร้าง Token สำเร็จ! (ดูใน Console)");
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