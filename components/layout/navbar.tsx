import Link from "next/link"
import ClientHeaderAction from "../client/client-header-action";

function Navbar() {

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <nav className="mx-40 flex justify-between mt-5">

        <h1 className="text-2xl font-bold">Ultimate E-Commerce</h1>
        <div className="flex justify-center gap-5">

          <Link href='/' className="text-xl font-bold">Home</Link>


          <Link href='/products' className="text-xl font-bold">Products</Link>


          <Link href='/contact' className="text-xl font-bold">Contact</Link>

        </div>

        <ClientHeaderAction />

      </nav>
    </header>
  )
}
export default Navbar