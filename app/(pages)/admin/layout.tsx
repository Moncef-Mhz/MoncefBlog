import AdminSidePanel from "@/components/layout/AdminSidePanel";

import React from "react";

const layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className="md:flex ">
      <AdminSidePanel />
      <div className="bg-zinc-900 w-full h-full p-10 text-white">
        {children}
      </div>
    </div>
  );
};

export default layout;
