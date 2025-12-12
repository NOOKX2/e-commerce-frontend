export type Product = {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  name: string;          
  description: string;
  price: number;
  category: string;
  imageUrl: string;     
  sellerId: number;
  slug: string;
}