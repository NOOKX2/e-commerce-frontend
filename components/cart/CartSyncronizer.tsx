'use client' 

import { useCartSync } from "@/hooks/useCartSync";

const CartSyncronizer = () => {
  useCartSync(); 
  return null;
}

export default CartSyncronizer;