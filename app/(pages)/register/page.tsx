import React from "react";
import RegisterForm from "@/components/layout/RegisterForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOption } from "@/app/api/auth/[...nextauth]/route";

export default async function Register() {
  const session = await getServerSession(authOption as any);

  if (session) redirect("/admin");
  return <RegisterForm />;
}
