"use client"

import { useEffect, useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import { useAuth } from "@/context/auth-context";

export function useCartSync() {
    const { user } = useAuth(); 
    const { items, setItems } = useCartStore();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const storageKey = user ? `cart-storage-${user.ID}` : 'cart-storage-guest';
        const savedCart = localStorage.getItem(storageKey);

        setIsLoaded(false);

        if (savedCart) {
            try{
                setItems(JSON.parse(savedCart));
            } catch(error) {
                console.log("Fail to parse card", error);
                setItems([]);
            }
        }
        else{
            setItems([]);
        }

        setIsLoaded(true);
    }, [user?.ID, setItems]);

    useEffect(() => {
        if(!isLoaded) return;

        const storageKey = user ? `cart-storage-${user.ID}` : 'cart-storage-guest';
        localStorage.setItem(storageKey, JSON.stringify(items));
    }, [items, user, isLoaded]);
}