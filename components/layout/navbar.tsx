import Link from "next/link"
import ClientHeaderAction from "./ClientHeaderAction";

function Navbar() {

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <nav className="mx-40 min-h-10 flex justify-between mt-5">

        <Link href='/'>
          <h1 className="text-2xl font-bold">Ultimate E-Commerce</h1>
        </Link>

        <div className="flex justify-center gap-5">

          <Link href='/products' className="text-xl font-bold">Products</Link>


          <Link href='/contact' className="text-xl font-bold">Contact</Link>

        </div>

        <ClientHeaderAction />

      </nav>
    </header>
  )
}
export default Navbar