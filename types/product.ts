export interface Product  {
  ID: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  name: string;          
  description: string;
  price: number;
  category: Category;
  imageUrl: string; 
  imageHash: string;    
  sellerId: number;
  slug: string;
  sku: string;
  quantity: number;
  salePrice: number;
}

export interface SellerProduct extends Product {
  costPrice?: number;      
  status: "active" | "draft" | "inactive" | "archived";
  totalSales: number; 
  rating: number;    
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  createdAt?: string;
}