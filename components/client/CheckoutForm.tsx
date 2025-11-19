import FormField from "@/components/forms/FormField"
import StripeWrapper from "./StripeWrapper"

function CheckoutForm() {
    return (
        <div className="space-y-8">
            <section>
                <h2 className="text-2xl font-bold mb-4">Contact</h2>
                <FormField
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="example@email.com"
                />
            </section>
            <section>
                <h2 className="text-2xl font-bold mb-4">Delivery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        name="firstName"
                        label="First Name"
                        placeholder="Your First Name"
                    />
                    <FormField
                        name="lastName"
                        label="Last Name"
                        placeholder="Your Last Name"
                    />
                </div>
                <div className="mt-4">
                    <FormField
                        name="phoneNumber"
                        label="Phone Number"
                        type="tel"
                        placeholder="012-345-6789"
                    />
                </div>
            </section>
            <section>
                <h2 className="text-2xl font-bold mb-4">Payment</h2>
                <StripeWrapper />
            </section>
        </div>
    )
}

export default CheckoutForm
