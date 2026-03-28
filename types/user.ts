
export interface User {
    ID: number;
    email: string; 
    name: string;
    role: string;
}

export interface AdminUser extends User {
    role: 'ADMIN' | 'SELLER' | 'BUYER' | string; 
    status: 'active' | 'suspended' | 'banned' | string;
    createdAt: string; 
    updatedAt?: string;
}

export interface AdminUserResponse {
    success: boolean;
    data?: AdminUser[];
    error?: string;
    pagination?: {
        total: number;
        page: number;
        limit: number;
    };
}