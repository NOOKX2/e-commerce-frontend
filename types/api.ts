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
    description?: string; 
}