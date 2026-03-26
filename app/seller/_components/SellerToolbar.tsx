'use client'

import { Search, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useTransition, useEffect, useState } from 'react'

interface ToolbarProps {
  placeholder?: string
  searchParamKey?: string
}

export function SellerTableToolbar({ 
  placeholder = "Search...", 
  searchParamKey = "search" 
}: ToolbarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  
  // เก็บค่าไว้ใน Local State ก่อนเพื่อไม่ให้พิมพ์ไปยิง API ไป (Debounce)
  const [searchValue, setSearchValue] = useState(searchParams.get(searchParamKey) ?? "")

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())
      if (searchValue) {
        params.set(searchParamKey, searchValue)
        params.set('page', '1') // พิมพ์ค้นหาใหม่ให้กลับไปหน้า 1 เสมอ
      } else {
        params.delete(searchParamKey)
      }

      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`, { scroll: false })
      })
    }, 500) // หน่วงเวลา 500ms

    return () => clearTimeout(delayDebounceFn)
  }, [searchValue])

  return (
    <div className="flex flex-col gap-4 rounded-3xl bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6 border-none">
      <div className="relative w-full sm:max-w-md">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className={`h-5 w-5 ${isPending ? 'text-blue-500 animate-pulse' : 'text-neutral-400'}`} />
        </div>
        <input
          type="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-2xl bg-neutral-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 shadow-inner outline-none ring-0 transition-all placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-blue-500/25"
        />
      </div>
      
      <Button
        type="button"
        variant="secondary"
        className="h-10 w-full shrink-0 rounded-2xl bg-neutral-100 font-medium text-slate-900 shadow-none hover:bg-neutral-200/80 sm:w-auto"
      >
        <Filter className="mr-2 h-4 w-4" />
        Filter
      </Button>
    </div>
  )
}