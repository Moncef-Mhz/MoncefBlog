"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const AdminProvider = ({ children }) => {
  const path = usePathname();
  const SplitPath = path.split("/")[1];
  return (
    <>
      {SplitPath === "admin" ||
      SplitPath === "register" ||
      SplitPath === "login" ? (
        <>{children}</>
      ) : (
        <>
          <Header />
          {children}
          <Footer />
        </>
      )}
    </>
  );
};

export default AdminProvider;
