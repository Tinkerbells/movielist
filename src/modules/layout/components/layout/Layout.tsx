import { LoginModal } from "@/components";
import { ReactNode } from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
// import Footer from "./fooFooter";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="">
        <Sidebar />
        {children}
        <LoginModal />
      </main>
      {/* <Footer /> */}
    </>
  );
};
