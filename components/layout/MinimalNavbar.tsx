import Link from "next/link"

function MinimalNavbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background">
            <nav className="mx-40 min-h-10 flex justify-between mt-5">

                <Link href='/'>
                    <h1 className="text-2xl font-bold">Ultimate E-Commerce</h1>
                </Link>


            </nav>
        </header>
    )
}

export default MinimalNavbar
