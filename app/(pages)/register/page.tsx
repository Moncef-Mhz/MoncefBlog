"use client";
import React from "react";
import RegisterForm from "@/components/layout/RegisterForm";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Register() {
  const { data: session } = useSession();

  if (session) redirect("/admin");
  return <RegisterForm />;
}
