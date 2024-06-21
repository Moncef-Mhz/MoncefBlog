"use client";
import React, { useState } from "react";
import useSWRInfinite from "swr/infinite";
import ArticlesCard from "@/components/layout/PostsCard";
import { Gutter } from "@/components/layout/Gutter";

type PostsType = {
  title: string;
  slug: string;
  content: string;
  description: string;
  image: string;
  author: string;
  date: string;
  _id: string;
  category: string;
};

const fetcher = async (url: string) => {
  const res = await fetch(url);
  return res.json();
};

const BlogPosts = () => {
  const [activeCat, setActiveCat] = useState("All");
  const {
    data: articlesData,
    isLoading,
    isValidating,
    size,
    setSize,
  } = useSWRInfinite<PostsType[]>(
    (index) => `/api/posts?page=${index}`,
    fetcher
  );

  const articles: PostsType[] = articlesData ? articlesData.flat() : [];
  const isLoadingMore =
    isLoading ||
    (size > 0 && articlesData && typeof articlesData[size - 1] === "undefined");
  const isEmpty = articlesData?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty ||
    (articlesData && articlesData[articlesData.length - 1]?.length < 10);

  if (!articles) {
    return <div>Loading...</div>;
  }

  return (
    <Gutter className="py-10 space-y-16">
      <h1 className="text-center  font-bold text-3xl md:text-4xl lg:text-6xl uppercase">
        Discover the best stories & <br /> Articles on the web
      </h1>

      {/* categories section */}
      {/* <div className="flex items-center gap-4 flex-wrap justify-start">
        {Category.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveCat(item.title)}
            className={[
              activeCat === item.title
                ? "border rounded-full lg:text-base text-sm bg-black text-white hover:bg-black/80 cursor-pointer hover:border-black/80 duration-150 px-4 py-2 border-black"
                : "border rounded-full lg:text-base text-sm cursor-pointer px-4 py-2 border-black",
            ]
              .filter(Boolean)
              .join("")}
          >
            {item.title}
          </div>
        ))}
      </div> */}

      {/* Articles section */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5 grid-cols-1 ">
        {articles &&
          articles
            .filter((item) =>
              activeCat === "All" ? true : item.category === activeCat
            )
            .map((item) => <ArticlesCard key={item._id} item={item} />)}
      </div>
      <div className="flex items-center w-full justify-center">
        <button
          disabled={isLoadingMore || isReachingEnd}
          onClick={() => setSize(size + 1)}
        >
          {isLoadingMore
            ? "loading..."
            : isReachingEnd
            ? "no more posts"
            : "load more"}
        </button>
      </div>
    </Gutter>
  );
};
export default BlogPosts;
