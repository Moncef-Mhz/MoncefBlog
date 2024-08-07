"use client";
import React from "react";
import { Gutter } from "../Gutter";
import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";

type posts = {
  title: string;
  slug: string;
  content: string;
  image: string;
  author: string;
  date: string;
  _id: string;
  description: string;
  category: string;
};

const fetcher = async (url: string) => {
  const res = await fetch(url);
  return res.json();
};
const Hero = () => {
  const { data, isLoading } = useSWR<posts[]>("/api/posts", fetcher);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const limitedArticles = data?.slice(0, 3);
  return (
    <Gutter className="grid lg:grid-cols-5 lg:max-h-[600px] grid-cols-1 lg:grid-rows-2 gap-2">
      {limitedArticles?.map((article) => (
        <Link
          href={`/posts/${article.slug}`}
          key={article._id}
          className="first:col-span-3 first:row-span-2 h-full  col-span-2  group relative overflow-hidden rounded-md"
        >
          <Image
            src={article.image}
            alt={article.title}
            width={1920}
            height={1080}
            className="object-cover w-full h-full aspect-video  cursor-pointer"
          />
          <div className="absolute bottom-0 left-0 space-y-2 py-4 px-4 bg-black/60 w-full shadow-lg translate-y-28 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 duration-150">
            <h1 className="text-xl font-bold  group-hover:underline text-white m-0">
              {article.title}
            </h1>
            <p className="text-sm text-white/80 m-0">
              {article.description.substring(0, 100)}
            </p>
          </div>
        </Link>
      ))}
    </Gutter>
  );
};

export default Hero;
