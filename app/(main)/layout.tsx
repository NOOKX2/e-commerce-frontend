import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f7]">
      <Navbar />
      <main className="mx-auto flex-1 w-full max-w-7xl  flex-col px-4 pb-12 pt-6 md:px-6 lg:px-8 lg:pt-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}