import { UserCreditCard } from "@/types/userCard";
import { Label } from "../../../../components/ui/label";
import CreditCardItem from "./CreditCardItem";
import AddNewCardOption from "./AddNewCardOption";

interface SaveCreditCardProps {
    cards: UserCreditCard[];
    selectedCardId: number | "new";
    onSelect: (id: number | "new") => void;
    onDelete: (id: number) => void;
}


function SavedCreditCardList({ cards, selectedCardId, onSelect, onDelete }: SaveCreditCardProps) {

    return (
        <div className="space-y-3">
            <Label className="text-base font-semibold">Payment Method</Label>
            {cards.map((card) => (
                <CreditCardItem
                    key={card.payment_method_id}
                    card={card}
                    isSelected={Number(selectedCardId) === Number(card.id)}
                    onClick={() => onSelect(card.id)}
                    onDelete={onDelete}
                />
            ))}
            <AddNewCardOption
                isSelected={selectedCardId === "new"}
                onClick={() => onSelect("new")}
            />
        </div>
    )
}

export default SavedCreditCardList
