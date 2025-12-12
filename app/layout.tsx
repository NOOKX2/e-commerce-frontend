import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import { getCurrentUser } from '@/lib/auth';
import AuthProvider from "../context/auth-context";

type RootLayoutProps = {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const initialUser = await getCurrentUser()
  console.log("initial user",initialUser);
  return (
    <html lang="en">
      <body className="w-full min-h-screen">
        <AuthProvider initialUser={initialUser}>
        <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
        <main className="min-h-screen">
          {children}
        </main>
      </AuthProvider>
      </body>
    </html>
  )
}