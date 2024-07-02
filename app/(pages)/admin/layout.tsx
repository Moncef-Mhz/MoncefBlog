import AdminSidePanel from "@/components/layout/AdminSidePanel";

import React from "react";

const layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className="md:flex md:flex-row-reverse  bg-zinc-900">
      <div className=" w-full h-full relative p-10 text-white">{children}</div>
      <AdminSidePanel />
    </div>
  );
};

export default layout;
