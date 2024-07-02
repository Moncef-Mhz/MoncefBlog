"use client";

import { items } from "@/constant";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Dashboard = () => {
  const { data: session } = useSession();
  return (
    <div className="w-full h-full">
      <h1 className="m-0">Welcome {session?.user?.name ?? "Admin"}</h1>
      <p className="m-0 text-white/70 text-sm">You are in the admin panel</p>
      <h1 className="text-white text-3xl font-bold mb-4 mt-10">Collections</h1>
      <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-1 gap-5 m-0 ">
        {items.map((item) => (
          <Link
            key={item.key}
            href={item.key}
            className="text-white flex space-x-3  no-underline m-0 w-[200px] bg-zinc-700 h-[120px] p-4 hover:bg-zinc-500 duration-75"
          >
            {item.icon}
            <h1 className="text-base font-medium m-0 ">{item.label}</h1>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
