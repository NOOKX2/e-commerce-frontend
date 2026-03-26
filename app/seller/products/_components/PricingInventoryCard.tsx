import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign, Package as PackageIcon } from "lucide-react";

interface PricingInventoryCardProps {
  price: string;
  costPrice: string;
  salePrice: string;
  quantity: string;
  sku?: string;
  isEdit: boolean;
  onPriceChange: (val: string) => void;
  onCostPriceChange: (val: string) => void;
  onSalePriceChange: (val: string) => void;
  onQuantityChange: (val: string) => void;
}

export function PricingInventoryCard({
  price, costPrice, salePrice, quantity, sku, isEdit,
  onPriceChange, onCostPriceChange, onSalePriceChange, onQuantityChange
}: PricingInventoryCardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Pricing Card */}
      <Card className="rounded-3xl border-0 bg-white py-8 shadow-sm">
        <CardHeader className="px-8">
          <CardTitle className="text-sm flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-green-500" /> Pricing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 px-8">
          <div className="space-y-2">
            <Label htmlFor="price">Price ($) <span className="text-red-500">*</span></Label>
            <Input id="price" type="number" required value={price} onChange={(e) => onPriceChange(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="salePrice">Sale Price ($)</Label>
            <Input id="salePrice" type="number" value={salePrice} onChange={(e) => onSalePriceChange(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="costPrice">Cost Price ($) <span className="text-red-500">*</span></Label>
            <Input id="costPrice" type="number" required value={costPrice} onChange={(e) => onCostPriceChange(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      {/* Inventory Card */}
      <Card className="rounded-3xl border-0 bg-white py-8 shadow-sm">
        <CardHeader className="px-8">
          <CardTitle className="text-sm flex items-center gap-2">
            <PackageIcon className="w-4 h-4 text-orange-500" /> Inventory
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 px-8">
          <div className="space-y-2">
            <Label htmlFor="stock">Stock <span className="text-red-500">*</span></Label>
            <Input id="stock" type="number" required value={quantity} onChange={(e) => onQuantityChange(e.target.value)} />
          </div>
          {isEdit && sku && (
            <div className="space-y-1 bg-neutral-50 p-4 rounded-xl">
              <Label className="text-neutral-500 text-xs">SKU Code</Label>
              <p className="font-mono text-sm">{sku}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}