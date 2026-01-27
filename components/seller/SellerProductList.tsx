"use client";

import { useState } from 'react';
import SellerProductHeader from './SellerProductHeader';
import SellerProductTable from './SellerProductTable';
import { SellerProduct } from '@/types/product';
import SellerProductTablePagination from './SellerProductTablePagination';

// Mock data for demonstration
const mockProducts: SellerProduct[] = [
    {
        ID: 1,
        name: "Premium Wireless Headphones",
        description: "High-quality noise-canceling headphones with 20h battery life.",
        price: 299.99,
        // --- เพิ่ม Field ใหม่ที่นี่ ---
        costPrice: 180.00,       // ราคาทุน (คนขายดูได้คนเดียว)
        status: "active",        // สถานะ: active, draft, out_of_stock, archived
        totalSales: 154,         // จำนวนที่ขายได้ทั้งหมด
        rating: 4.8,             // คะแนนเฉลี่ยของสินค้านี้
        // ------------------------
        category: "Electronics",
        imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
        sellerId: 1,
        slug: "premium-wireless-headphones",
        sku: "WH-1000XM4",
        quantity: 50,
        createdAt: "2024-01-15T10:00:00Z",
        updatedAt: "2024-01-15T10:00:00Z",
        deletedAt: null,
    },
    {
        ID: 2,
        name: "Ergonomic Office Chair",
        description: "Comfortable office chair with lumbar support and adjustable height.",
        price: 199.50,
        costPrice: 120.00,
        status: "active",
        totalSales: 42,
        rating: 4.5,
        category: "Furniture",
        imageUrl: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&q=80",
        sellerId: 1,
        slug: "ergonomic-office-chair",
        sku: "OC-2024",
        quantity: 25,
        createdAt: "2024-01-14T14:30:00Z",
        updatedAt: "2024-01-14T14:30:00Z",
        deletedAt: null,
    },
    {
        ID: 3,
        name: "Mechanical Keyboard",
        description: "RGB mechanical keyboard with tactile brown switches.",
        price: 129.00,
        costPrice: 75.00,
        status: "out_of_stock",
        totalSales: 89,
        rating: 4.7,
        category: "Electronics",
        imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b91a603?w=800&q=80",
        sellerId: 1,
        slug: "mechanical-keyboard",
        sku: "MK-RGB-001",
        quantity: 0,
        createdAt: "2024-01-12T09:15:00Z",
        updatedAt: "2024-01-12T09:15:00Z",
        deletedAt: null,
    },
];

export default function SellerProductList() {
    const [products, setProducts] = useState<SellerProduct[]>(mockProducts);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header Actions */}
            <SellerProductHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>

            {/* Products Table */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <SellerProductTable products={filteredProducts}/>
                {/* Pagination (Visual only for now) */}
                <SellerProductTablePagination products={filteredProducts} />
            </div>
        </div>
    );
}
