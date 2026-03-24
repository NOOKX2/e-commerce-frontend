"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const categories = [
    { id: "mobile_phone", name: "Mobile Phone" },
    { id: "notebook", name: "Notebook" },
    { id: "tablet", name: "tablet"},
]

export function Filter() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleCategoryChange = (categoryId: string, checked: boolean) => {
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.delete("page");
        const selectedCategories = currentParams.get("category")?.split(",").filter(Boolean) || [];
        console.log(selectedCategories)
        if (checked) {
            const newCategories = [...new Set([...selectedCategories, categoryId])]
            currentParams.set("category", newCategories.join(","))
        }
        else {
            const newCategories = selectedCategories.filter(c => c !== categoryId);
            if (newCategories.length > 0) {
                currentParams.set("category", newCategories.join(","));
            } else {
                currentParams.delete("category");
            }
        }

        const newUrl = `${pathname}?${currentParams.toString()}`;
        router.replace(newUrl, {scroll: false});
    }
    return (
        <aside className="overflow-y-auto lg:h-full lg:max-h-screen lg:overflow-y-auto lg:py-6 flex flex-col gap-8">
            <div className="flex flex-col gap-8">
                <h3 className="px-4 text-lg font-semibold tracking-tight">Category</h3>
                <div className="flex flex-col gap-1 px-4">
                    {categories.map((category) => (
                        <div key={category.id} className="flex gap-2 p-2 rounded-md hover:bg-accent">
                            <Checkbox
                                id={category.id}
                                checked={searchParams.get("category")?.includes(category.id) ?? false}
                                onCheckedChange={(checked) => handleCategoryChange(category.id, !!checked)}
                            />
                            <Label htmlFor={category.id} className="w-full cursor-pointer text-sm">{category.name}</Label>
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    )
}
