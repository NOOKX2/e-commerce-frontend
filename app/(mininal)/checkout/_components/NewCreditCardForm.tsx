import { CardCvcElement, CardExpiryElement, CardNumberElement } from "@stripe/react-stripe-js";
import { Label } from "../../../../components/ui/label";
import StripeInput from "./StripeInput";

interface NewCardFormProps {
    options: any;
    saveCard: boolean;
    onSaveCardChange: (val: boolean) => void;
}

function NewCreditCardForm({ options, saveCard, onSaveCardChange }: NewCardFormProps) {
    return (
        <div className='space-y-4'>
            <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <StripeInput>
                    <CardNumberElement id="cardNumber" options={options} />
                </StripeInput>
            </div>
            <div className='grid grid-cols-2 gap-4'>
                <div>
                    <Label htmlFor="cardExpiry">Expiration Date</Label>
                    <StripeInput>
                        <CardExpiryElement id="cardExpiry" options={options} />
                    </StripeInput>
                </div>
                <div>
                    <Label htmlFor="cardCvc">CVC</Label>
                    <StripeInput>
                        <CardCvcElement id="cardCvc" options={options} />
                    </StripeInput>
                </div>
            </div>
            <div className="flex items-center space-x-2 pt-2">
                <input
                    type="checkbox"
                    id="saveCard"
                    checked={saveCard}
                    onChange={(e) => onSaveCardChange(e.target.checked)}
                    className="rounded border-gray-300"
                />
                <Label htmlFor="saveCard" className="text-sm font-normal cursor-pointer text-muted-foreground">
                    Save this credit card for future payments
                </Label>
            </div>
        </div>
    )
}

export default NewCreditCardForm
