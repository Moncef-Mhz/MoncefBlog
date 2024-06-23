"use client";
import React, { useState } from "react";
import { NavLinks } from "@/constant/index";
import { Gutter } from "@/components/layout/Gutter";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import { useSession } from "next-auth/react";
import { Menu, X } from "lucide-react";

type Links = {
  name: string;
  href: string;
};

function index() {
  const [OpenMenu, setOpenMenu] = useState(false);
  const path = usePathname();
  // const { data: session } = useSession();
  return (
    <Gutter className="w-full  h-[70] flex items-center justify-between relative bg-zinc-900">
      <Link
        href={"/"}
        className="font-bold no-underline text-2xl  text-white uppercase"
      >
        DesignoBit
      </Link>
      <ul className="list-none  space-x-6 hidden md:block">
        {NavLinks.map((link: Links) => (
          <Link
            href={link.href}
            key={link.name}
            className={
              path === link.href
                ? "no-underline text-white"
                : "no-underline text-white/70 hover:text-white duration-150"
            }
          >
            {link.name}
          </Link>
        ))}
      </ul>
      <div
        className="block md:hidden cursor-pointer"
        onClick={() => setOpenMenu(true)}
      >
        <Menu size={30} color="white" />
      </div>
      {OpenMenu ? (
        <div className="top-0 right-0 bg-zinc-900 absolute w-[60%] h-screen z-50 p-6">
          <X
            color="white"
            size={30}
            onClick={() => setOpenMenu(false)}
            className="cursor-pointer"
          />
          <ul className="flex flex-col">
            {NavLinks.map((link: Links) => (
              <Link
                href={link.href}
                key={link.name}
                className={
                  path === link.href
                    ? "no-underline text-white"
                    : "no-underline text-white/70 hover:text-white duration-150"
                }
                onClick={() => setOpenMenu(false)}
              >
                {link.name}
              </Link>
            ))}
          </ul>
        </div>
      ) : (
        <></>
      )}
    </Gutter>
  );
}

export default index;
