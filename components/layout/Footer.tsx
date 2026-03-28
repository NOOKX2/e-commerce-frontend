// @/components/Footer.tsx
import Link from "next/link";

function Footer() {
  return (
    <footer className="w-full bg-white py-8">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          
          {/* Brand & Copyright */}
          <div className="space-y-1">
            <h2 className="text-lg font-black tracking-tighter text-slate-900">
              Ultimate E-Commerce
            </h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              © 2026. Built for your next setup.
            </p>
          </div>

          {/* Compact Links */}
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            <Link href="/products" className="hover:text-blue-600 transition-colors">Products</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">Support</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">Instagram</Link>
          </div>
          
        </div>
      </div>
    </footer>
  );
}

export default Footer;