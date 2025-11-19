'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button'; 
import { Product } from '@/types/api'; 
import QuantitySelector from '../ui/quantity-selector';
import toast from 'react-hot-toast'
import { useCartStore } from '@/lib/cart-store';

interface ProductActionProps {
    product: Product;
}

function ProductAction({ product }: ProductActionProps) {
    const [quantity, setQuantity] = useState(1)

    const {addToCart} = useCartStore()

    const handleAddToCart = () => {
        addToCart(product, quantity)
        toast.success(`${quantity} x ${product.name} added to cart!`);
    }
    return (
        <div className='mt-8 flex flex-col gap-4'>
          
            <label className='font-semibold'>Quantity:</label>
            <QuantitySelector 
            quantity={quantity}
            setQuantity={setQuantity}
            //maxStock={product.stock}
            />
            <Button 
            onClick={handleAddToCart} 
            className='mt-4 w-full'
            size='lg'
            >
            Add To Cart
            </Button>
        </div>
    )
}

export default ProductAction
