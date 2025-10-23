import Link from "next/link"
import { Search, ShoppingCart, CircleUserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';


function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="mx-40 flex justify-between mt-5">
      
        <h1 className="text-2xl">Ultimate E-Commerce</h1>
        <ul className="flex justify-center gap-5">
          <li>
            <Link href='/' className="text-xl">Home</Link>
          </li>
          <li>
            <Link href='/products' className="text-xl">Products</Link>
          </li>
          <li>
            <Link href='/contact' className="text-xl">Contact</Link>
          </li>
        </ul>
    
        <ul className="flex justify-center gap-5">
          <Button variant="ghost" size='icon-lg' aria-label='Search'>
            <Search className="size-10" />
          </Button>
          <li>
            <Link href='/cart'>
              <Button variant='ghost' size='icon-lg'>
                <ShoppingCart className="size-10" />
              </Button>
            </Link>
          </li>
          <li>
           <Link href='/profile'>
          <Button variant='ghost' size='icon-lg'>
            <CircleUserRound className="size-10" />
          </Button>
        </Link>
        </li>
        </ul>
       
      </div>
    </header>
  )
}
export default Navbar