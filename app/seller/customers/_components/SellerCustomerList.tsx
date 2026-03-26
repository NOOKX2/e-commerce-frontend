"use client";

import { useState } from 'react';
import SellerCustomerToolbar from './SellerCustomerToolbar';
import { Customer } from '@/types/customer';
import SellerCustomerTable from './SellerCustomerTable';
import { SellerTableToolbar } from '../../_components/SellerToolbar';

interface customersProps {
    customers: Customer[];
}


export default function SellerCustomerList({ customers }: customersProps) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Toolbar */}

            <SellerTableToolbar placeholder='Search for customer name'/>

            {/* Table */}
            <SellerCustomerTable customers={filteredCustomers} />
        </div>
    );
}
