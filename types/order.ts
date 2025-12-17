import { Product } from "./product";
import { ShippingAddressData } from "./shippingAdressData";

export interface Order {
  ID: number; 
  userId: number;
  status: string;
  totalAmount: number;
  shippingAddress: ShippingAddressData;
  stripePaymentIntentId: string;
  createdAt: string;     
  updatedAt: string;
  items: OrderItem[];
}

export interface OrderItem {
  ID: number;
  createdAt: string;
  updatedAt: string;
  orderId: number;       
  productId: number;    
  quantity: number;       
  priceAtPurchase: number; 
  product: Product;       
}

