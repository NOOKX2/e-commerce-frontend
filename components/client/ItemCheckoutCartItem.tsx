import { CartItemProps } from "@/types/api"
import Image from "next/image"

function ItemCheckoutCartItem({ item }: CartItemProps) {
    return (
        <li key={item.id} className='flex items-center justify-between gap-50 border rounded-lg px-4'>

            <div className='flex items-center gap-5 flex-1'>
                <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={80}
                    height={80}
                    className='rounded-md object-cover shrink-0'
                />
                <div>
                    <p className='font-semibold truncate'>{item.name}</p>
                </div>
            </div>
            <div className='flex items-center gap-8 md:gap-12'>
                <p className='w-24 text-center text-gray-700'>{`${item.price} ฿`}</p>
                <p className='w-16 text-center font-semibold'>{item.quantity}</p>
            </div>

        </li>
    )
}

export default ItemCheckoutCartItem
