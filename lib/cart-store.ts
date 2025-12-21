import {create} from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/types/product';

export interface CartItem extends Product {
    quantity: number
}

interface CartState {
    items: CartItem[];
    addToCart: (product: Product, quantity: number) => void;
    updateQuantity: (productId: number, newQuantity: number) => void;
    removeFromCart: (productId: number) => void;
    clearCart: () => void;
    setItems: (items: CartItem[]) => void;
}

export const useCartStore = create<CartState>() (
    
        (set, get) => ({
            items: [],

            addToCart: (product, quantity) => {
                const {items} = get();
                const existingItem = items.find((item) => item.ID === product.ID);

                if (existingItem) {
                    const updateItem = items.map((item) => 
                        item.ID === product.ID
                    ?{...item, quantity: item.quantity + quantity} 
                    :item
                );
                set({items: updateItem});
                }
                else{
                    set({items: [...items, {...product, quantity}] });
                }
            },

            removeFromCart: (productId) => {
                 set({ items: get().items.filter((item) => item.ID !== productId) });
            },

            updateQuantity: (productId, newQuantity) => {
                if (newQuantity <= 0) {
                    get().removeFromCart(productId);
                    return;
                } 
                set({
                    items: get().items.map((item) => 
                        item.ID === productId ? {...item, quantity: newQuantity }: item
                    ),
                });
            },

            clearCart: () => {
                set({items: [] });
            },

            setItems(items) {
                set({ items });
            },
        }),
        
    
)