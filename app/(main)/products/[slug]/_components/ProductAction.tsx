'use client'

import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/product';
import QuantitySelector from './QuantitySelector';
import toast from 'react-hot-toast'
import { useCartStore } from '@/lib/cart-store';
import { useAuth } from '@/context/auth-context';
import { isAccountSuspended, suspendedAccountMessage } from '@/lib/account-status';

interface ProductActionProps {
    product: Product;
}

function ProductAction({ product }: ProductActionProps) {
    const [quantity, setQuantity] = useState(1);
    const { user } = useAuth();

    const { addToCart, items } = useCartStore();

    const cartItem = items.find(item => item.product.ID === product.ID);
    const quantityInCart = cartItem ? cartItem.quantity : 0;


    const remainingStock = useMemo(() => {
        return product.quantity - quantityInCart;
    }, [product.quantity, quantityInCart]);

    const disPlayStock = remainingStock - quantity;

    const handleAddToCart = () => {
        if (isAccountSuspended(user)) {
            toast.error(suspendedAccountMessage());
            return;
        }
        addToCart(product, quantity)
        toast.success(`${quantity} x ${product.name} added to cart!`);
    }
    return (
        <div className='mt-6 flex flex-col gap-4'>
            <label className='text-sm font-medium text-neutral-700'>Stock: {disPlayStock > 0 ? disPlayStock : 0}</label>

            <label className='text-sm font-medium text-neutral-700'>Quantity:</label>
            <QuantitySelector
                quantity={quantity}
                setQuantity={setQuantity}
                maxStock={remainingStock}
            />
            <Button
                onClick={handleAddToCart}
                className='mt-2 w-full rounded-full'
                size='lg'
                disabled={remainingStock <= 0}
            >
                {product.quantity <= 0 ? "Out of Stock" : remainingStock <= 0 ? "Limit Reached in Cart" : "Add To Cart"}
            </Button>
        </div>
    )
}

export default ProductAction
