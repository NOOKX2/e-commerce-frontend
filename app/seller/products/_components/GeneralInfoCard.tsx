import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Info } from "lucide-react";

interface GeneralInfoCardProps {
  name: string;
  description: string;
  onNameChange: (val: string) => void;
  onDescriptionChange: (val: string) => void;
}

export function GeneralInfoCard({ name, description, onNameChange, onDescriptionChange }: GeneralInfoCardProps) {
  return (
    <Card className="rounded-3xl border-0 bg-white py-8 shadow-sm">
      <CardHeader className="px-8">
        <CardTitle className="flex items-center gap-2">
          <Info className="w-4 h-4 text-blue-500" /> General Info
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 px-8">
        <div className="space-y-2">
          <Label htmlFor="name">Product Name <span className="text-red-500">*</span></Label>
          <Input 
            id="name" 
            required 
            value={name} 
            onChange={(e) => onNameChange(e.target.value)} 
            placeholder="e.g. iPhone 15 Pro" 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea 
            id="description" 
            className="min-h-32" 
            value={description} 
            onChange={(e) => onDescriptionChange(e.target.value)} 
            placeholder="Tell more about your product..." 
          />
        </div>
      </CardContent>
    </Card>
  );
}