export type ApiResponse<T> = {
    status: 'success' | 'error';
    message: string;
    data: T;
};

export type Product = {
    id: string;
    name: string;
    category: string;
    price: number;
    imageUrl: string;
    slug: string; 
    description: string; 
}

export type User = {
    id: number;
    email: String;
    name: string;
    role: string
}

export type CartItemProps = {
  item: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    quantity: number;
  };
};