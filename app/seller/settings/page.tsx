import { cookies } from "next/headers";
import SellerSettingsClient from "@/app/seller/settings/_components/SellerSettingsClient";
import { SellerShopSettings } from "@/types/settings";

async function getSellerShop(): Promise<SellerShopSettings | null> {
  const cookieStore = await cookies();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/seller/settings/shop`, {
      cache: "no-store",
      headers: { Cookie: cookieStore.toString() },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data as SellerShopSettings;
  } catch {
    return null;
  }
}

export const metadata = {
  title: "Settings | Seller Center",
  description: "Manage your store settings.",
};

export default async function SellerSettingsPage() {
  const data = await getSellerShop();

  if (!data) {
    return (
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-red-100 bg-red-50/50 p-8 text-sm text-red-800">
        Could not load shop settings. Sign in as a seller and try again.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Settings</h1>
        <p className="mt-2 text-sm font-medium text-neutral-500">
          Manage your shop profile, pickup location, and payout account.
        </p>
      </div>

      <SellerSettingsClient initialShop={data} />
    </div>
  );
}
