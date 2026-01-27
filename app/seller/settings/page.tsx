import SellerSettingsForm from "@/components/seller/SellerSettingsForm";

export const metadata = {
    title: "Settings | Seller Center",
    description: "Manage your store settings.",
};

export default function SellerSettingsPage() {
    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-500">Manage your store preferences and account settings.</p>
            </div>

            <SellerSettingsForm />
        </div>
    );
}
