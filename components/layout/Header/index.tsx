"use client";
import React, { ReactNode, useState } from "react";
import { NavLinks, SocialMedia } from "@/constant/index";
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
  return (
    <Gutter className="w-full h-[80px] flex items-center justify-between relative bg-zinc-900">
      {/* Logo */}
      <Link
        href={"/"}
        className="font-bold no-underline text-2xl  text-white uppercase"
      >
        DesignoBit
      </Link>

      {/* Desktop NavLinks */}
      <ul className="list-none  space-x-6 hidden md:block">
        {NavLinks.map((link: Links) => (
          <Link
            href={link.href}
            key={link.name}
            target={link.name === "Portfolio" ? "_blank" : "_self"}
            className={
              path === link.href
                ? "no-underline text-white "
                : "no-underline text-white/70  hover:text-white duration-150"
            }
          >
            {link.name}
          </Link>
        ))}
      </ul>

      {/* Desktop Social media */}
      <div className="md:flex hidden items-center gap-4">
        {SocialMedia.map((item) => (
          <Link
            href={item.link}
            key={item.name}
            className="text-white hover:text-white/70 duration-150"
          >
            {item.icon}
          </Link>
        ))}
      </div>

      {/* Mobile Burger */}
      <div
        className="block md:hidden cursor-pointer"
        onClick={() => setOpenMenu(true)}
      >
        <Menu size={30} color="white" />
      </div>

      {/* Mobile Side Menu */}
      {OpenMenu ? (
        <div className="top-0 right-0 bg-zinc-900 absolute w-[60%] h-screen z-50 p-6">
          {/* Mobile Close Side menu */}
          <X
            color="white"
            size={30}
            onClick={() => setOpenMenu(false)}
            className="cursor-pointer"
          />

          {/* Mobile Navlinks */}
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
