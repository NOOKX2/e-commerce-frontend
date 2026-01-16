'use client'

import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/product';
import QuantitySelector from '../ui/quantity-selector';
import toast from 'react-hot-toast'
import { useCartStore } from '@/lib/cart-store';

interface ProductActionProps {
    product: Product;
}

function ProductAction({ product }: ProductActionProps) {
    const [quantity, setQuantity] = useState(1);

    const { addToCart, items } = useCartStore();

    const cartItem = items.find(item => item.product.ID === product.ID);
    const quantityInCart = cartItem ? cartItem.quantity : 0;


    const remainingStock = useMemo(() => {
        return product.quantity - quantityInCart;
    }, [product.quantity, quantityInCart]);

    const disPlayStock = remainingStock - quantity;

    const handleAddToCart = () => {
        addToCart(product, quantity)
        toast.success(`${quantity} x ${product.name} added to cart!`);
    }
    return (
        <div className='mt-8 flex flex-col gap-4'>
            <label className='font-semibold'> Stock : {disPlayStock > 0 ? disPlayStock : 0}</label>

            <label className='font-semibold'>Quantity:</label>
            <QuantitySelector
                quantity={quantity}
                setQuantity={setQuantity}
                maxStock={remainingStock}
            />
            <Button
                onClick={handleAddToCart}
                className='mt-4 w-full'
                size='lg'
                disabled={remainingStock <= 0}
            >
                {product.quantity <= 0 ? "Out of Stock" : remainingStock <= 0 ? "Limit Reached in Cart" : "Add To Cart"}
            </Button>
        </div>
    )
}

export default ProductAction
