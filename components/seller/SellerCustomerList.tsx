"use client";

import  { useState } from 'react';
import SellerCustomerToolbar from './SellerCustomerToolbar';
import { Customer } from '@/types/customer';
import SellerCustomerTable from './SellerCustomerTable';


const mockCustomers: Customer[] = [
    {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        status: "Active",
        totalOrders: 12,
        totalSpent: 1250.00,
        lastOrderDate: "2024-01-20",
        location: "New York, USA"
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        status: "Active",
        totalOrders: 5,
        totalSpent: 450.50,
        lastOrderDate: "2024-01-15",
        location: "London, UK"
    },
    {
        id: 3,
        name: "Robert Johnson",
        email: "robert.j@example.com",
        status: "Inactive",
        totalOrders: 1,
        totalSpent: 85.00,
        lastOrderDate: "2023-11-10",
        location: "Toronto, Canada"
    },
    {
        id: 4,
        name: "Alice Brown",
        email: "alice.b@example.com",
        status: "Active",
        totalOrders: 8,
        totalSpent: 920.00,
        lastOrderDate: "2024-01-18",
        location: "Sydney, Australia"
    },
];

export default function SellerCustomerList() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredCustomers = mockCustomers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Toolbar */}
            
            <SellerCustomerToolbar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>

            {/* Table */}
            <SellerCustomerTable customers={filteredCustomers}/>
        </div>
    );
}
