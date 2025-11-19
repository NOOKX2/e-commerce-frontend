"use client"

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripeCheckoutForm from './StripeFormCheckout';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
function StripeWrapper() {
    return (
        <Elements stripe={stripePromise}>
            <StripeCheckoutForm />
        </Elements>
    )
}

export default StripeWrapper
