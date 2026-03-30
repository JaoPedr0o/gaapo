import Footer from "./_components/Footer";
import Navbar from "./_components/Navbar";
import { ReactNode } from "react";

export default function PublicLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
     <div className="min-h-screen bg-white text-slate-900">
      <header>
        <Navbar />
      </header>

      <main>{children}</main>

      <footer>
        <Footer />
      </footer>
      </div>
    </>
  );
}