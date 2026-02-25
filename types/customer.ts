export interface Customer {
    id: number;
    name: string;
    email: string;
    status: string;
    totalOrders: number;
    totalSpent: number;
    lastOrderDate: string;
    avatarUrl?: string;
    location?: string;
}