import { CartItemProps } from "@/types/cartItemProps"
import Image from "next/image"

function ItemCheckoutCartItem({ item }: CartItemProps) {
    return (
        <li key={item.ID} className='flex items-center justify-between gap-4 border rounded-lg px-4'>

          
                <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={80}
                    height={80}
                    className='rounded-md object-cover shrink-0'
                />
              <div className="flex-1 min-w-0">
                <p className='font-semibold truncate flex-1 min-w-0'>{item.name}</p>
              </div>
         
            <div className='flex items-center gap-8 md:gap-12 shrink-0'>
                <p className='w-24 text-center text-gray-700'>{`${item.price} ฿`}</p>
                <p className='w-16 text-center font-semibold'>{item.quantity}</p>
            </div>

        </li>
    )
}

export default ItemCheckoutCartItem
