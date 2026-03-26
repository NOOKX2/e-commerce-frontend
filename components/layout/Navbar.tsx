import Link from "next/link"
import ClientHeaderAction from "./ClientHeaderAction";

function Navbar() {

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6 lg:px-8">
        <Link href='/' className="shrink-0">
          <h1 className="font-semibold tracking-tight text-neutral-900 text-3xl">Ultimate E-Commerce</h1>
        </Link>

        <div className="hidden items-center justify-center gap-6 md:flex">
          <Link href='/products' className="text-2xl font-medium text-neutral-700 transition-colors hover:text-neutral-900">Products</Link>
          <Link href='/contact' className="text-2xl font-medium text-neutral-700 transition-colors hover:text-neutral-900">Contact</Link>
        </div>

        <ClientHeaderAction />
      </nav>
    </header>
  )
}
export default Navbar