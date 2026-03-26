import "./globals.css";
import { Toaster } from 'react-hot-toast';
import { getCurrentUser } from '@/lib/auth';
import AuthProvider from "../context/auth-context";
import CartSyncronizer from "@/components/cart/CartSyncronizer";

type RootLayoutProps = {
  children: React.ReactNode;
}


export default async function RootLayout({ children }: RootLayoutProps) {
  const initialUser = await getCurrentUser()
  return (
    <html lang="en">
      <body className="w-full min-h-screen">
        <AuthProvider initialUser={initialUser}>
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        <div className="min-h-screen">
          <CartSyncronizer />
          {children}
        </div>
      </AuthProvider>
      </body>
    </html>
  )
}