"use client";
import React, { useState } from "react";
import { NavLinks } from "@/constant/index";
import { Gutter } from "@/components/layout/Gutter";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

type Links = {
  name: string;
  href: string;
};

function index() {
  const [OpenMenu, setOpenMenu] = useState(false);
  const path = usePathname();
  const { data: session } = useSession();
  console.log(session);
  return (
    <Gutter className="w-full h-[70] flex items-center justify-between border-b-[2px] border-black">
      <h2 className="font-bold">DesignoBit</h2>
      <ul className="list-none  space-x-6 hidden md:block">
        {NavLinks.map((link: Links) => (
          <Link
            href={link.href}
            key={link.name}
            className={
              path === link.href
                ? "no-underline text-black"
                : "no-underline text-black/70 hover:text-black duration-150"
            }
          >
            {link.name}
          </Link>
        ))}
      </ul>
    </Gutter>
  );
}

export default index;
