import Link from "next/link"

function MinimalNavbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-white/80 backdrop-blur">
            <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6 lg:px-8">
                <Link href='/'>
                    <h1 className="text-base font-semibold tracking-tight text-neutral-900 md:text-xl">Ultimate E-Commerce</h1>
                </Link>
            </nav>
        </header>
    )
}

export default MinimalNavbar
