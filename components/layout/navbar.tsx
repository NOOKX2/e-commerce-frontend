import Link from "next/link"
import { Search, CircleUserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DynamicHeaderIcon from "../client/dynamic-header-icon";

function Navbar() {

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="mx-40 flex justify-between mt-5">

        <h1 className="text-2xl font-bold">Ultimate E-Commerce</h1>
        <ul className="flex justify-center gap-5">
          <li>
            <Link href='/' className="text-xl font-bold">Home</Link>
          </li>
          <li>
            <Link href='/products' className="text-xl font-bold">Products</Link>
          </li>
          <li>
            <Link href='/contact' className="text-xl font-bold">Contact</Link>
          </li>
        </ul>

        <ul className="flex justify-center gap-5">
          <Button variant="ghost" size='icon-lg' aria-label='Search'>
            <Search className="size-10" />
          </Button>
          <li>
            <DynamicHeaderIcon />
          </li>
         </ul>

      </div>
    </header>
  )
}
export default Navbar