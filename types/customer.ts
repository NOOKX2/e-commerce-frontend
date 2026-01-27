export interface Customer {
    id: number;
    name: string;
    email: string;
    status: "Active" | "Inactive";
    totalOrders: number;
    totalSpent: number;
    lastOrderDate: string;
    avatarUrl?: string;
    location?: string;
}