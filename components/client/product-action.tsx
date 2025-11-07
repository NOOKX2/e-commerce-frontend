'use client'

import { useState } from 'react';
import QuantitySelector from '@/components/ui/quantity-selector';
import { Button } from '@/components/ui/button'; // สมมติว่าใช้ Button จาก shadcn
import { Product } from '@/types/api'; // Import Type ของ Product

interface ProductActionProps {
    product: Product;
}

function ProductAction({ product }: ProductActionProps) {
    const [quantity, setQuantity] = useState(1)

    const handleAddToCart = () => {
        //logic add product to card
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
