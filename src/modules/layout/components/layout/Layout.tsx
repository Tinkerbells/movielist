import { LoginModal } from "@/components";
import { useLayoutStore } from "@/store/layoutStore";
import { ReactNode } from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
// import Footer from "./fooFooter";

export const Layout = ({ children }: { children: ReactNode }) => {
  const isSidebarCollapsed = useLayoutStore(
    (state) => state.isSidebarCollapsed
  );
  return (
    <>
      <Navbar />
      <main className={`h-screen w-full ${isSidebarCollapsed && "pl-60"} `}>
        <Sidebar />
        {children}
        <LoginModal />
      </main>
      {/* <Footer /> */}
    </>
  );
};
