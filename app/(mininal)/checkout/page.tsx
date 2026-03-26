import ItemCheckout from "@/app/(mininal)/checkout/_components/ItemCheckout";
import CheckoutForm from "@/app/(mininal)/checkout/_components/CheckoutForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function CheckoutPage() {
  const cookiesStore = await cookies();
  const token = cookiesStore.has('session_token');

  if (!token) {
    redirect('/login?callbackUrl=/checkout');
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 items-start gap-6 py-2 lg:grid-cols-[1fr_380px] lg:gap-8">
        <CheckoutForm />
        <ItemCheckout />
      </div>
    </div>
  )
}

export default CheckoutPage;
