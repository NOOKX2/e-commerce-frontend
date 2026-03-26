import { useCartStore, CartItem } from "@/lib/cart-store";
import Image from "next/image";
import QuantitySelector from '../../products/[slug]/_components/QuantitySelector';
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface CartItemsListProps {
  items: CartItem[];
}

function CartItemList({ items }: CartItemsListProps) {
  const { removeFromCart, updateQuantity } = useCartStore();
  return (
    <div className="glass-card space-y-4 p-4 md:p-6">
      {items.map((item) => (
        <div key={item.product.ID} className="flex flex-col gap-4 border-b border-black/5 pb-4 sm:flex-row sm:items-center">
          <Image
            src={item.product.imageUrl}
            alt={item.product.name}
            width={100}
            height={100}
            className="h-24 w-24 rounded-xl object-cover"
          />
          <div className="min-w-0 flex-1">
            <h2 className="line-clamp-2 font-semibold">{item.product.name}</h2>
            <p className="text-sm text-muted-foreground">
              {`฿${item.product.price.toLocaleString()}`}
            </p>
          </div>
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <QuantitySelector
              quantity={item.quantity}
              setQuantity={(newQuantity) => updateQuantity(item.product.ID, newQuantity)}
              maxStock={item.product.quantity}
            />
            <Button
              variant='ghost'
              size='icon'
              onClick={() => removeFromCart(item.product.ID)}
            >
              <Trash2 className="h-5 w-5 text-muted-foreground" />
            </Button>
          </div>
        </div>
      )
      )}
    </div>

  )
}

export default CartItemList
