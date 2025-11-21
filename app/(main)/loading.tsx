import { Skeleton } from "@/components/ui/skeleton"

function SkeletonCard() {
    return (
        <div className="flex flex-col gap-2">

            <Skeleton className="aspect-square w-full rounded-lg" />
            <div className="flex flex-col gap-2 pt-1">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/4" />
            </div>
        </div>
    )
}

function loading() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({length: 8}).map((_, index) => (
                <SkeletonCard key={index} />
            ))}
        </div>
    )
}

export default loading
