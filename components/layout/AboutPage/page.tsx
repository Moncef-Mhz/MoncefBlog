import React from "react";
import { Gutter } from "../Gutter";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "DesignoBit | About",
  description:
    "Hi, I am moncef a web Developer & Designer with over 4 years of experience crafting seamless and engaging digital experiences.",
};

const AboutPage = () => {
  return (
    <Gutter className="flex bg-zinc-900 h-full w-full flex-col   pb-10">
      <div className="z-10 flex flex-col gap-2">
        <h1 className="text-white text-3xl lg:text-6xl font-bold font-mono ">
          Hi, I am moncef a web Developer & Designer with over 4 years of
          experience crafting seamless and engaging digital experiences.
        </h1>
        {/* <hr /> */}
        <hr className="my-4" />
        <div className="flex flex-col lg:flex-row items-start justify-between">
          <h1 className="text-white font-mono lg:flex-[60%] m-0 font-semibold">
            Why me
          </h1>
          <p className="text-white font-mono lg:flex-[40%]">
            I believe that great design and functionality go hand-in-hand.
            Whether I'm building dynamic interfaces or optimizing user
            experiences, my goal is always to create applications that are both
            visually appealing and highly efficient.
          </p>
        </div>
        <hr className="my-4" />
        <div className="flex  flex-col lg:flex-row items-start justify-between">
          <h1 className="text-white font-mono flex-[60%] m-0 font-semibold">
            My mission
          </h1>
          <p className="text-white font-mono flex-[40%]">
            My mission is to empower fellow developers and designers by sharing
            my knowledge and experience. I strive to create content that
            inspires innovation, promotes best practices, and simplifies complex
            concepts. Through this blog, I aim to build a community where we can
            learn, collaborate, and push the boundaries of web development
            together.
          </p>
        </div>
      </div>
      <div className="absolute w-[200px] h-[200px] rounded-full bg-blue-400 md:blur-[150px] blur-[200px] lg:right-52 lg:top-52 right-10 top-20"></div>
      <div className="absolute w-[200px] h-[200px] rounded-full bg-blue-400 md:blur-[150px] blur-[200px] lg:left-52 lg:bottom-52 left-10 bottom-0"></div>
    </Gutter>
  );
};

export default AboutPage;
