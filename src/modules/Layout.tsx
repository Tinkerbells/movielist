import { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-primary-content">
        <Sidebar />
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
