import SellerSettingsForm from "@/components/seller/SellerSettingsForm";

export const metadata = {
    title: "Settings | Seller Center",
    description: "Manage your store settings.",
};

export default function SellerSettingsPage() {
    return (
        <div className="mx-auto max-w-7xl space-y-8">
            <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                    Settings
                </h1>
                <p className="mt-2 text-sm text-neutral-500">
                    Manage your store preferences and account settings.
                </p>
            </div>

            <SellerSettingsForm />
        </div>
    );
}
