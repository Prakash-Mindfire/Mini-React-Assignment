import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="main-content" >
        {children}
      </main>
      <Footer />
    </>
  );
}
