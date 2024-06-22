"use client";
import React from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

const admin = () => {
  const { data: session } = useSession();
  if (!session) redirect("login");
  if (session) redirect("admin/dashboard");
};

export default admin;
