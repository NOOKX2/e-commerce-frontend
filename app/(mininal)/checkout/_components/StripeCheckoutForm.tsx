"use client";

import { useEffect, useState } from 'react';
import { useStripe, useElements, CardNumberElement} from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/cart-store';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { isAccountSuspended, suspendedAccountMessage } from '@/lib/account-status';
import { ShippingAddressData } from '@/types/shippingAdressData';
import { UserCreditCard } from '@/types/userCard';
import SavedCreditCardList from './SaveCreditCardList';
import NewCreditCardForm from './NewCreditCardForm';

interface StripeCheckoutFormProps {
    shippingAddress: ShippingAddressData;
}

export default function StripeCheckoutForm({ shippingAddress }: StripeCheckoutFormProps) {
    const { user } = useAuth();
    const { items, clearCart } = useCartStore();
    const stripe = useStripe();
    const elements = useElements();
    const router = useRouter();

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

    const [savedCreditCard, setSavedCreditCards] = useState<UserCreditCard[]>([]);
    const [selectedCardId, setSelectedCardId] = useState<number | "new">("new");
    const [shouldSaveCard, setShouldSaveCard] = useState(false);

    useEffect(() => {
        const fetchCards = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_API_URL}/v1/cards`, {
                credentials: 'include'
            });
            const data = await res.json();
            if (data.success && Array.isArray(data.cards)) {
                setSavedCreditCards(data.cards);
                if (data.cards.length > 0) {
                    setSelectedCardId(data.cards[0].id);
                }
            }

        };
        fetchCards();
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        if (isAccountSuspended(user)) {
            setError(suspendedAccountMessage());
            return;
        }

        if (!shippingAddress) {
            setError("Please provide a shipping address.");
            return;
        }

        setIsLoading(true);
        setError(null);

        let finalPaymentMethodID = "";

        try {
            if (selectedCardId === "new") {
                const cardNumberElement = elements.getElement(CardNumberElement);
                const { error, paymentMethod } = await stripe!.createPaymentMethod({
                    type: 'card',
                    card: cardNumberElement!,
                });
                if (error) {
                    setError(error.message || "Card verification failed");
                    setIsLoading(false);
                    return;
                }
                finalPaymentMethodID = paymentMethod.id;
            }
            else {
                const selected = savedCreditCard.find(c => c.id === selectedCardId);
                if (selected) {
                    finalPaymentMethodID = selected.payment_method_id; 
                } else {
                    throw new Error("Selected card not found");
                }
            }

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
                    paymentMethodId: finalPaymentMethodID,
                    savedCreditCard: selectedCardId === "new" ? shouldSaveCard : false,
                }),
            });

            const orderData = await res.json();
            if (!res.ok) {
                console.error(orderData.error);
                const msg =
                    orderData.errorType === "account_suspended"
                        ? suspendedAccountMessage()
                        : orderData.error || "Failed to create your order.";
                throw new Error(msg);
            }


            clearCart();
            setIsPaymentSuccessful(true);
            router.push(`/orders/success/${orderData.order.ID}`);

        } catch (error: any) {
            setError(error.message)
        } finally {
            setIsLoading(false);
        }


    };

    const handleDeleteCard = async (cardId: number) => {
        if (!confirm("Are you sure you want to remove this card")) {
            return;
        }

        try {
           const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_API_URL}/v1/cards/${cardId}`, {
            method: 'DELETE',
            credentials: 'include'
        }); 

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Server responded with an error");
        }

        const data = await res.json();
        if (data.success) {
            const updatedCard = savedCreditCard.filter(card => card.id !== cardId);
            setSavedCreditCards(updatedCard);

            if (selectedCardId === cardId) {
                setSelectedCardId("new");
            }
            alert("Card deleted successfully");
        } else {
            throw new Error(data.message || "Failed to delete card");
        }

        } catch(error: any) {
            console.error(error);
            alert(error.message || "Something wen wrong while dleting the card");
        }
    }

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
            {savedCreditCard.length > 0 && (
                <SavedCreditCardList
                    cards={savedCreditCard}
                    selectedCardId={selectedCardId}
                    onSelect={(id) => {
                        setSelectedCardId(id);
                    }} 
                    onDelete={handleDeleteCard}
                />
            )}
            {(selectedCardId === "new" || savedCreditCard.length === 0) && (
                <>
                    {savedCreditCard.length > 0 && <hr className="my-6" />}
                    <NewCreditCardForm 
                        options={cartElementOptions} 
                        saveCard={shouldSaveCard} 
                        onSaveCardChange={setShouldSaveCard} 
                    />
                </>
            )}

            {error && <div className="text-red-500 mt-4 text-sm">{error}</div>}

            <Button type='submit' disabled={!stripe || isLoading} className='w-full mt-6'>
                {isLoading ? 'Processing...' : 'Pay Now'}
            </Button>

        </form>
    )
}