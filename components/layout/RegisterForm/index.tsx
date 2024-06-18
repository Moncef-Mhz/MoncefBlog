"use client";
import Input from "@/components/ui/Input";
import Link from "next/link";
import React, { FormEvent, useState } from "react";

const RegisterForm = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const SubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Please enter all required fields");
      return;
    }
    const res = await fetch("api/register", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.error) {
      setError(data.error);
      return;
    }
    console.log(data);
  };
  console.log(name, email, password);
  return (
    <form
      className="grid place-content-center bg-white w-full h-screen"
      onSubmit={(e) => SubmitHandler(e)}
    >
      <div className="p-5 flex flex-col border-t-4 drop-shadow-lg border-blue-500 bg-white rounded-md">
        <h2 className="text-black font-bold text-start">Register</h2>
        <div className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Name"
            varient="default"
            label="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            min={3}
            max={16}
            className=""
            // required
          />
          <Input
            type="email"
            placeholder="Email"
            varient="default"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            label="Email"
            className=""
          />
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            label="Password"
            varient="default"
            min={8}
            className=""
          />
          {error && (
            <p className="text-red-600 bg-red-300 text-sm rounded py-2 px-4">
              {error}
            </p>
          )}
          <button className="w-full bg-blue-400 text-white rounded-md py-2">
            Submit
          </button>
          <p className="m-0 text-xs text-right">
            Already have an account? <Link href="/login">Login</Link>
          </p>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
