"use client";
import React from "react";
import useSWRInfinite from "swr/infinite";
import ArticlesCard from "@/components/layout/PostsCard";
import { Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";

type ArticlesType = {
  title: string;
  slug: string;
  content: string;
  description: string;
  image: string;
  author: string;
  date: string;
  _id: string;
  tag: string;
};

const fetcher = async (url: string) => {
  const res = await fetch(url);
  return res.json();
};

const BlogPosts = () => {
  const {
    data: articlesData,
    isLoading,
    isValidating,
    size,
    setSize,
  } = useSWRInfinite<ArticlesType[]>(
    (index) => `/api/posts?page=${index}`,
    fetcher
  );

  const articles: ArticlesType[] = articlesData ? articlesData.flat() : [];
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
    <>
      <h3 className="font-bold m-0">Recent Posts</h3>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5 grid-cols-1 ">
        {articles &&
          articles.map((item) => <ArticlesCard key={item._id} item={item} />)}
      </div>
      {/* here is load button */}
      <div className="my-10 flex items-center w-full justify-center">
        <button
          disabled={isLoadingMore || isReachingEnd}
          onClick={() => setSize(size + 1)}
          className="px-4 cursor-pointer py-2 space-x-2 rounded text-white bg-zinc-900 "
        >
          {isLoadingMore ? (
            <div className="flex items-center justify-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              loading...
            </div>
          ) : isReachingEnd ? (
            "no more posts"
          ) : (
            "load more"
          )}
        </button>
      </div>
    </>
  );
};

export default BlogPosts;
