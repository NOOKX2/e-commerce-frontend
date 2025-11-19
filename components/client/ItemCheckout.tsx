"use client"

import { useCartStore } from '@/lib/cart-store'
import ItemCheckoutHeader from './ItemCheckoutHeader';
import ItemCheckoutCartItem from './ItemCheckoutCartItem';

function ItemCheckout() {
    const { items } = useCartStore();

    return (
        <div className='w-full space-y-3'>
          <ItemCheckoutHeader />
            <ul className='space-y-4'>
                {items.map(item => (

                  <ItemCheckoutCartItem key={item.id} item={item}/>

                ))}
            </ul>

        </div>
    )
}

export default ItemCheckout
