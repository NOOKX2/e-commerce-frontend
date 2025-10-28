export type Product = {
    id: string;
    name: string;
    category: string;
    price: number;
    imageUrl: string;
    slug: string; 
    description?: string; 
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod_001",
    name: "iPhone 17 Pro Max",
    category: "iPhone",
    price: 41900,
    imageUrl: "/images/iphone-17-pro-max.webp", 
    slug: "iphone-17-pro-max",
    description: "The ultimate iPhone, with the powerful A17 Pro chip."
  },
  {
    id: "prod_002",
    name: "MacBook Pro 16",
    category: "Notebook",
    price: 47900,
    imageUrl: "/images/macbook-pro-16.jpeg",
    slug: "macbook-air-15-m2",
    description: "Impressively big, impossibly thin. Supercharged by the M2 chip."
  },
  {
    id: "prod_003",
    name: "Samsung Galaxy S24 Ultra",
    category: "Phone",
    price: 46900,
    imageUrl: "/images/samsung-galaxy-s24-ultra.webp",
    slug: "galaxy-s24-ultra",
    description: "Welcome to the era of mobile AI."
  },
  {
    id: "prod_004",
    name: "Dell XPS 15 Laptop",
    category: "Notebook",
    price: 89990,
    imageUrl: "/images/dell-xps-15.jpeg",
    slug: "dell-xps-15",
    description: "Stunning display, immersive sound and powerful performance."
  },
  {
    id: "prod_005",
    name: "iPhone 15",
    category: "iPhone",
    price: 32900,
    imageUrl: "/images/products/iphone-15-pink.jpg",
    slug: "iphone-15",
    description: "Newphoria. A total powerhouse."
  },
  {
    id: "prod_006",
    name: "Apple Watch Series 9",
    category: "Wearable",
    price: 15900,
    imageUrl: "/images/products/apple-watch-9.jpg",
    slug: "apple-watch-series-9",
    description: "Smarter. Brighter. Mightier."
  },
  // คุณสามารถเพิ่มสินค้าจำลองเข้าไปอีกได้ตามต้องการ
];