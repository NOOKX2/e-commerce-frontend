import { CartItemProps } from "@/types/cartItemProps"
import Image from "next/image"

function ItemCheckoutCartItem({ item }: CartItemProps) {
    return (
        <li key={item.ID} className='flex flex-col gap-3 rounded-xl border border-black/5 bg-white p-4 md:flex-row md:items-center md:justify-between'>
                <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={80}
                    height={80}
                    className='h-20 w-20 rounded-lg object-cover shrink-0'
                />
              <div className="flex-1 min-w-0">
                <p className='line-clamp-2 min-w-0 flex-1 font-semibold'>{item.name}</p>
              </div>
         
            <div className='flex w-full items-center justify-between gap-8 text-sm md:w-auto md:gap-12 md:text-base'>
                <p className='text-gray-700 md:w-24 md:text-center'>{`${item.price.toLocaleString()} ฿`}</p>
                <p className='font-semibold md:w-16 md:text-center'>x{item.quantity}</p>
            </div>

        </li>
    )
}

export default ItemCheckoutCartItem
