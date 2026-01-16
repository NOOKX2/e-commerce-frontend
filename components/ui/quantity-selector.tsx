import { Minus, Plus } from "lucide-react";
import { useState } from "react";

interface QuantitySelectorProps {
  quantity: number,
  setQuantity: (quantity: number) => void,
  maxStock: number
}

function QuantitySelector({ quantity, setQuantity, maxStock }: QuantitySelectorProps) {
  console.log(`maxStock = ${maxStock}`)
  const [error, setError] = useState("");
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setError("");
    }
  };

  const handleIncrement = () => {
    if (quantity < maxStock) {
      setQuantity(quantity + 1);
      setError("");
    }
    else {
      setError(`Product in stock have only ${maxStock} `);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value == '') {
      setQuantity(1);
      return;
    }

    const numValue = parseInt(value, 10)

    if (numValue > maxStock) {
      setQuantity(maxStock);
      setError(`This Product has only ${maxStock} in stock`);
    }
    else {
      setQuantity(numValue);
      setError("");
    }
  }
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <button
          onClick={handleDecrement}
          disabled={quantity <= 1}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-zinc-300 transition hover:bg-zinc-100 disabled:opacity-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
        >
          <Minus className="h-4 w-4" />
        </button>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={quantity}
          onChange={handleChange}
          className="h-10 w-16 rounded-md border border-zinc-300 text-center text-lg font-semibold focus:border-primary focus:ring-1 focus:ring-primary dark:border-zinc-700 dark:bg-zinc-900"
        />
        <button
          onClick={handleIncrement}
          disabled={quantity >= maxStock}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-zinc-300 transition hover:bg-zinc-100 disabled:opacity-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      {error && (
        <p className="text-xs font-medium text-red-500 animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  )
}

export default QuantitySelector
