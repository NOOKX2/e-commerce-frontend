import Link from 'next/link';
import { ArrowLeft, Calendar, Mail } from 'lucide-react';

interface customerProfileHeaderProps {
    id: number;
    name: string;
    status: string;
}

export default function CustomerProfileHeader({ id, name, status }: customerProfileHeaderProps) {
    return (
      <div className="flex flex-col gap-4">
            <Link href="/seller/customers" className="flex items-center text-blue-600 hover:underline font-medium w-fit">
                <ArrowLeft className="h-4 w-4 mr-1" /> Back to Customers
            </Link>
            <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-2xl shadow-sm">
                    {name ? name.charAt(0).toUpperCase() : '?'}
                </div>
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
                        <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full 
                            ${status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {status}
                        </span>
                    </div>
                    <p className="text-gray-500 mt-1 flex items-center">
                        Customer ID: #{id}
                    </p>
                </div>
            </div>
        </div>
    )
}