import { useCartStore, CartItem } from "@/lib/cart-store"; 
import Image from "next/image";
import QuantitySelector from '../ui/quantity-selector';
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface CartItemsListProps {
  items: CartItem[];
}

function CartItemList({ items }: CartItemsListProps) {
  const { removeFromCart, updateQuantity } = useCartStore();
  console.log("items in cart list",items[0]);
  return (
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.ID} className="flex items-center gap-4 border-b pb-4">
            <Image
              src={item.imageUrl}
              alt={item.name}
              width={100}
              height={100}
              className="rounded-md object-cover"
            />
            <div className="flex-1 min-w-[150px]">
              <h2 className="font-semibold">{item.name}</h2>
              <p className="text-sm text-muted-foreground">
                {`฿${item.price.toLocaleString()}`}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <QuantitySelector
                quantity={item.quantity}
                setQuantity={(newQuantity) => updateQuantity(item.ID, newQuantity)}
              />
              <Button
                variant='ghost'
                size='icon'
                onClick={() => removeFromCart(item.ID)}
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
