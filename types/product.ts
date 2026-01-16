export interface Product  {
  ID: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  name: string;          
  description: string;
  price: number;
  category: string;
  imageUrl: string;     
  sellerId: number;
  slug: string;
  sku: string;
  quantity: number;
}