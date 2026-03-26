import { Product } from "./product";

export interface Order {
  ID: number; 
  userId: number;
  status: string;
  totalAmount: number;
  stripePaymentIntentId: string;
  createdAt: string;     
  updatedAt: string;
  shippingEmail: string;         
	shippingReceiverName: string; 
	shippingPhoneNumber: string;   
	shippingStreetAddress :string;
	shippingSubDistrict: string;   
	shippingDistrict: string      
	shippingProvince: string;      
	shippingPostalCode: string;    
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

