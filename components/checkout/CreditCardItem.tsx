import { UserCreditCard } from "@/types/userCard"
import { Trash2 } from "lucide-react"

function CreditCardItem({
    card,
    isSelected,
    onClick,
    onDelete
}: {
    card: UserCreditCard;
    isSelected: boolean;
    onClick: () => void;
    onDelete: (id: number) => void;
}) {
    return (
        <div className="relative group">
            <div
                onClick={() => {
                    onClick();
                }}
                className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-all ${isSelected ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-gray-200 hover:border-gray-300"
                    }`}
            >
                <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? "border-primary" : "border-gray-300"
                        }`}>
                        {isSelected && <div className="w-2 h-2 rounded-full bg-primary" />}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium uppercase">
                            {card.brand} •••• {card.last_four}
                        </span>
                        <span className="text-xs text-muted-foreground">
                            {card.expiry_month}/{card.expiry_year}
                        </span>
                    </div>
                </div>


                <button
                    type="button"
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(card.id);
                    }}
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    )
}

export default CreditCardItem