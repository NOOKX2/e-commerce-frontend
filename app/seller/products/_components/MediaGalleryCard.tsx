import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";
import Image from "next/image";

interface MediaGalleryCardProps {
  imageFile: File | null;
  previewUrl: string | null;
  initialImageUrl?: string;
  onImageChange: (file: File | null) => void;
  isEdit: boolean;
}

export function MediaGalleryCard({ imageFile, previewUrl, initialImageUrl, onImageChange, isEdit }: MediaGalleryCardProps) {
  return (
    <Card className="rounded-3xl border-0 bg-white py-8 shadow-sm">
      <CardHeader className="px-8">
        <CardTitle>Media Gallery</CardTitle>
      </CardHeader>
      <CardContent className="px-8">
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-neutral-100 border">
            <Image
              src={previewUrl || initialImageUrl || "/fallback-image.png"}
              className="w-full h-full object-cover"
              alt="Preview"
              width={200}
              height={200}
            />
            {imageFile && (
              <button 
                type="button" 
                onClick={() => onImageChange(null)} 
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-sm hover:bg-red-600"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
          <Label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-neutral-200 text-neutral-400 transition-colors hover:bg-neutral-50">
            <Upload className="w-6 h-6 mb-1" />
            <span className="text-[10px]">{isEdit ? "Change Image" : "Upload Image"}</span>
            <input 
              type="file" 
              className="hidden" 
              accept="image/*" 
              onChange={(e) => onImageChange(e.target.files?.[0] || null)} 
            />
          </Label>
        </div>
      </CardContent>
    </Card>
  );
}