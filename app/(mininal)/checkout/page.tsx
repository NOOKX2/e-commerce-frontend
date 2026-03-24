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
    <div className="w-full max-w-7xl mx-auto">

      <div className="grid grid-cols-1 md:grid-cols-2 px-4 py-8 md:px-8 lg:px-16 place-items-start gap-20">

        <CheckoutForm />

        <ItemCheckout />

      </div>
    </div>
  )
}

export default CheckoutPage;
