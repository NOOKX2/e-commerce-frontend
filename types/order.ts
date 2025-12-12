import { Product } from "./product";

export type Order = {
  ID: number; 
  userId: number;
  status: string;
  totalAmount: number;
  shippingAddress: string;
  stripePaymentIntentId: string;
  createdAt: string;     
  updatedAt: string;
  items: OrderItem[];
}

export type OrderItem = {
  ID: number;
  createdAt: string;
  updatedAt: string;
  orderId: number;       
  productId: number;    
  quantity: number;       
  priceAtPurchase: number; 
  product: Product;       
}

