import ItemCheckout from "@/components/client/ItemCheckout";
import CheckoutForm from "@/components/client/CheckoutForm";

function page() {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 px-4 py-8 md:px-8 lg:px-16 place-items-center">
      <div>
        <CheckoutForm />
      </div>
      <div className="sticky top-8 bg=gray-50 p-6 rounded-lg border">
        <h2 className="text-2xl font-bold mb-4">Your Order</h2>
        <ItemCheckout />
      </div>
    </div>
  )
}

export default page
