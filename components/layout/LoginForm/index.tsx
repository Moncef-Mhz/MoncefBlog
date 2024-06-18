"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Input from "@/components/ui/Input";

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.replace("admin");
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid Credentials");
        return;
      }
      router.replace("admin");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="grid place-items-center bg-white w-full h-screen">
      <div className="border-t-4 drop-shadow-lg p-5 border-blue-500 bg-white rounded-md">
        <h2 className="text-black font-bold text-start">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="email"
            varient="default"
            value={email}
            label="Email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            varient="default"
            value={password}
            label="Password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-blue-400 text-white rounded-md py-2">
            Login
          </button>
          {error && (
            <div className="bg-red-500 rounded-md text-white w-fit text-sm py-1 px-3 my-2">
              {error}
            </div>
          )}

          <p className="m-0 text-xs text-right">
            Dont have an account? <Link href="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
