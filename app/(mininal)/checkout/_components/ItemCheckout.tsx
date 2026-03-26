"use client"

import { useCartStore } from '@/lib/cart-store'
import ItemCheckoutHeader from './ItemCheckoutHeader';
import ItemCheckoutCartItem from './ItemCheckoutCartItem';
import OrderSummaryCheckout from './OrderSummaryCheckout';

function ItemCheckout() {
  const { items } = useCartStore();

  return (
    <div className="glass-card sticky top-24 p-5 md:p-6">
      <h2 className="mb-4 text-2xl font-semibold tracking-tight">Your Order</h2>
      <div className='w-full space-y-3'>
        <ItemCheckoutHeader />
        <ul className='space-y-4'>
          {items.map(item => (

            <ItemCheckoutCartItem key={item.product.ID} item={item.product} />

          ))}
        </ul>
        <OrderSummaryCheckout items={items} />
      </div>
    </div>
  )
}

export default ItemCheckout
