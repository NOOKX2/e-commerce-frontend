import { Mail, MapPin, Phone } from 'lucide-react';

interface CustomerContactProps {
    email: string;
    phoneNumber: string;
    location: string;
}

export default function CustomerContactCard({
    email,
    phoneNumber,
    location,
}: CustomerContactProps) {
    return (
        <div className="rounded-3xl bg-white p-8 shadow-sm sm:p-9">
            <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                Contact
            </h2>
            <div className="mt-6 space-y-4">
                <div className="flex items-center text-sm text-neutral-600">
                    <Mail className="mr-3 h-5 w-5 shrink-0 text-neutral-400" />
                    {email}
                </div>
                <div className="flex items-center text-sm text-neutral-600">
                    <Phone className="mr-3 h-5 w-5 shrink-0 text-neutral-400" />
                    {phoneNumber || 'No phone number'}
                </div>
                <div className="flex items-start text-sm text-neutral-600">
                    <MapPin className="mr-3 mt-0.5 h-5 w-5 shrink-0 text-neutral-400" />
                    <span>{location || 'No location provided'}</span>
                </div>
            </div>
        </div>
    );
}
