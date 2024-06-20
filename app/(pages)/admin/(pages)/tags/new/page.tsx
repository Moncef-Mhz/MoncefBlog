"use client";
import Input from "@/components/ui/Input";
import React, { useState } from "react";

const NewTag = () => {
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string>("");

  const SubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/tags", {
        method: "POST",
        body: JSON.stringify({ name: name.toLowerCase() }),
      });
      const data = await res.json();
      console.log(data);

      if (res.ok) {
        setName("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {name ? (
        <h1 className="text-6xl m-0 font-bold capitalize">{name}</h1>
      ) : (
        <h1 className="text-6xl m-0 font-bold">[Untitled]</h1>
      )}
      <hr className="my-6" />
      <form className="mt-4" onSubmit={(e) => SubmitHandler(e)}>
        {/* <div className=" flex w-full items-end justify-end">
          <button className="text-black bg-white font-medium px-4 py-2 rounded-md">
            Save
          </button>
        </div>
        <hr className="my-6" /> */}
        <Input
          placeholder="Add Tag"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className=""
          varient="default"
          type="text"
          label="Add Tag"
          min={3}
        />
        {error && (
          <p className="text-red-600 bg-red-300 text-sm rounded py-2 px-4">
            {error}
          </p>
        )}
      </form>
      {/* <button>save</button> */}
    </div>
  );
};

export default NewTag;
