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
  sellerId: number;
  slug: string;
  sku: string;
  quantity: number;
}

export interface SellerProduct extends Product {
  costPrice?: number;      
  status: "active" | "draft" | "hidden" | "out_of_stock";
  totalSales: number; 
  rating: number;    
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  createdAt?: string;
}