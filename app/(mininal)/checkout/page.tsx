import ItemCheckout from "@/components/client/ItemCheckout";
import CheckoutForm from "@/components/client/CheckoutForm";

function page() {

  return (
    <div className="w-full max-w-7xl mx-auto">

      <div className="grid grid-cols-1 md:grid-cols-2 px-4 py-8 md:px-8 lg:px-16 place-items-start">

        <CheckoutForm />

        <ItemCheckout />

      </div>
    </div>
  )
}

export default page
