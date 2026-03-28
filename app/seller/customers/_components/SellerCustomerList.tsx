"use client";

import { SellerTableToolbar } from "@/app/seller/_components/SellerToolbar";
import { Customer } from "@/types/customer";
import SellerCustomerTable from "./SellerCustomerTable";

interface CustomersProps {
  customers: Customer[];
}

export default function SellerCustomerList({ customers }: CustomersProps) {
  return (
    <div className="space-y-6">
      <SellerTableToolbar placeholder="Search customers by name or email..." />
      <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
        <SellerCustomerTable customers={customers} />
      </div>
    </div>
  );
}
