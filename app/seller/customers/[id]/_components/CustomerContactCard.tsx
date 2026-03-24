import { Mail, MapPin, Phone } from 'lucide-react';

interface CustomerContactProps {
    email: string;
    phoneNumber: string;
    location: string;
}

export default function CustomerContactCard({ email, phoneNumber, location }: CustomerContactProps) {
    return (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
            <div className="space-y-4">
                <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-5 h-5 mr-3 text-gray-400" />
                    {email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-5 h-5 mr-3 text-gray-400" />
                    {phoneNumber || "No phone number"}
                </div>
                <div className="flex items-start text-sm text-gray-600">
                    <MapPin className="w-5 h-5 mr-3 text-gray-400 shrink-0 mt-0.5" />
                    <span>{location || "No location provided"}</span>
                </div>
            </div>
        </div>
    );
}