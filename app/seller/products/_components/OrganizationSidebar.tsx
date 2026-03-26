import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tag } from "lucide-react";
import { Category } from "@/types/product";

interface OrganizationSidebarProps {
  status: string;
  categoryID: string;
  vendor: string;
  categories: Category[];
  isEdit: boolean;
  onStatusChange: (val: string) => void;
  onCategoryIDChange: (val: string) => void;
  onVendorChange: (val: string) => void;
}

export function OrganizationSidebar({
  status, categoryID, vendor, categories, isEdit,
  onStatusChange, onCategoryIDChange, onVendorChange
}: OrganizationSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Status Card */}
      <Card className="rounded-3xl border-0 bg-white py-8 shadow-sm">
        <CardHeader className="px-8"><CardTitle>Status</CardTitle></CardHeader>
        <CardContent className="px-8">
          {isEdit ? (
            <Select value={status} onValueChange={onStatusChange}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <div className="flex items-center justify-between border-b border-neutral-100 py-2">
              <span className="text-sm text-neutral-500">Availability</span>
              <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
            </div>
          )}
          <p className="mt-3 text-xs text-muted-foreground">
            {isEdit ? "Archived products won't be visible to customers." : "New products are created as Active."}
          </p>
        </CardContent>
      </Card>

      {/* Organization Card */}
      <Card className="rounded-3xl border-0 bg-white py-8 shadow-sm">
        <CardHeader className="px-8">
          <CardTitle className="flex items-center gap-2"><Tag className="w-4 h-4" /> Organization</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 px-8">
          <div className="space-y-2">
            <Label>Category <span className="text-red-500">*</span></Label>
            <Select value={categoryID} onValueChange={onCategoryIDChange}>
              <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
              <SelectContent>
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <SelectItem key={cat.id} value={String(cat.id)}>{cat.name}</SelectItem>
                  ))
                ) : (
                  <SelectItem value="none" disabled>No categories found</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
          {isEdit && (
            <div className="space-y-2 pt-2">
              <Label htmlFor="vendor">Vendor</Label>
              <Input id="vendor" value={vendor} onChange={(e) => onVendorChange(e.target.value)} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}