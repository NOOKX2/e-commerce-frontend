function AddNewCardOption({ isSelected, onClick }: { isSelected: boolean, onClick: () => void }) {
    return (
        <div
            onClick={onClick}
            className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all ${isSelected ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-gray-200"
                }`}
        >
            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? "border-primary" : ""}`}>
                {isSelected && <div className="w-2 h-2 rounded-full bg-primary" />}
            </div>
            <span className="text-sm font-medium">+ Add New Credit Card</span>
        </div>
    )
}

export default AddNewCardOption
