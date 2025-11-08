import {create} from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/types/api';

export interface CartItem extends Product {
    quantity: number
}

interface CartState {
    items: CartItem[];
    addToCart: (product: Product, quantity: number) => void;
    updateQuantity: (productId: string, newQuantity: number) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>() (
    persist(
        (set, get) => ({
            items: [],

            addToCart: (product, quantity) => {
                const {items} = get();
                const existingItem = items.find((item) => item.id === product.id);

                if (existingItem) {
                    const updateItem = items.map((item) => 
                        item.id === product.id
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
                 set({ items: get().items.filter((item) => item.id !== productId) });
            },

            updateQuantity: (productId, newQuantity) => {
                if (newQuantity <= 0) {
                    get().removeFromCart(productId);
                    return;
                } 
                set({
                    items: get().items.map((item) => 
                        item.id === productId ? {...item, quantity: newQuantity }: item
                    ),
                });
            },

            clearCart: () => {
                set({items: [] });
            },
        }),
        {
            name: 'cart-storage',
            storage: createJSONStorage(() => localStorage),
        } 
        
    )
)