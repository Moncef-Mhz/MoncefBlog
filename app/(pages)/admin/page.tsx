import React from "react";
// import RegisterForm from "@/components/RegisterForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOption } from "@/app/api/auth/[...nextauth]/route";

const admin = async () => {
  const session = await getServerSession(authOption as any);
  if (!session) redirect("login");
  if (session) redirect("admin/dashboard");
};

export default admin;
