"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { items } from "@/constant/index";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Gutter } from "../Gutter";

const AdminSidePanel: React.FC = () => {
  const path = usePathname();
  const size = useWindowSize();
  return (
    <>
      {size.width > 768 ? (
        <div className="w-[20%]  bg-[#191919] text-white border-r border-white h-screen sticky top-0 left-0">
          <div className="flex">
            <h3 className="p-6">DesignoBit</h3>
          </div>

          {/* NavLinks */}
          <ul className="p-0">
            {items.map((item) => (
              <Link
                href={item.key}
                key={item.key}
                className="no-underline m-0 py-3 px-6 space-x-5 duration-100 hover:bg-blue-300 text-white flex items-center "
              >
                {item.icon} <p className="m-0 p-0">{item.label}</p>
              </Link>
            ))}
          </ul>

          {/* Logout */}
          <button
            className="flex absolute left-0 bottom-0 items-center py-3 px-6 w-full space-x-5 "
            onClick={() => signOut()}
          >
            <LogOut /> <p>LogOut</p>
          </button>
        </div>
      ) : (
        <div className=" w-full   bg-[#191919] flex items-center justify-evenly py-6 border-t">
          {items.map((item) => (
            <Link
              href={item.key}
              key={item.key}
              className="no-underline m-0 text-white hover:text-blue-400 duration-100"
            >
              {item.icon}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}
export default AdminSidePanel;
