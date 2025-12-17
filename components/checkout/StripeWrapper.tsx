"use client"

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripeCheckoutForm from './StripeCheckoutForm';
import { ShippingAddressData } from '@/types/shippingAdressData';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface StripeWrapperProps {
    shippingAddress: ShippingAddressData;
}

function StripeWrapper({shippingAddress}: StripeWrapperProps) {
    return (
        <Elements stripe={stripePromise}>
            <StripeCheckoutForm shippingAddress={shippingAddress}/>
        </Elements>
    )
}

export default StripeWrapper
