"use client"

import { useCartStore } from '@/lib/cart-store'
import ItemCheckoutHeader from './ItemCheckoutHeader';
import ItemCheckoutCartItem from './ItemCheckoutCartItem';
import OrderSummaryCheckout from './OrderSummaryCheckout';

function ItemCheckout() {
    const { items } = useCartStore();
    console.log(items);
    return (
      <div className="sticky top-8 bg-gray-50 p-6 rounded-lg border">
        <h2 className="text-2xl font-bold mb-4">Your Order</h2>
        <div className='w-full space-y-3'>
          <ItemCheckoutHeader />
            <ul className='space-y-4'>
                {items.map(item => (

                  <ItemCheckoutCartItem key={item.ID} item={item}/>

                ))}
            </ul>
          <OrderSummaryCheckout items={items}/>
        </div>
        </div>
    )
}

export default ItemCheckout
