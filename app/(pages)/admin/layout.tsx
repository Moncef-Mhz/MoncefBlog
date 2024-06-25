import AdminSidePanel from "@/components/layout/AdminSidePanel";

import React from "react";

const layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className="md:flex bg-zinc-900">
      <AdminSidePanel />
      <div className=" w-full h-full relative p-10 text-white">{children}</div>
    </div>
  );
};

export default layout;
