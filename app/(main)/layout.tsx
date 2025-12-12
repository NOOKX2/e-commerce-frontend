import Navbar from "@/components/layout/Navbar";

export default function MinimalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-50">
          <Navbar />
          {children}
         </div>
        
    )
}