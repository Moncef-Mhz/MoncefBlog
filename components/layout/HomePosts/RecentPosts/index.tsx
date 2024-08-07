import React from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import moment from "moment";
import useSWRInfinite from "swr/infinite";

//Article DataType
type PostsType = {
  title: string;
  slug: string;
  content: string;
  description: string;
  image: string;
  author: string;
  date: string;
  _id: string;
  tag: string;
  createAt: string;
};

//SWR fetcher
const fetcher = async (url: string) => {
  const res = await fetch(url);
  return res.json();
};

const RecentPosts = () => {
  //SWR INFINTE Scroll
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

  //Infinte Scroll Parameter
  const articles: PostsType[] = articlesData ? articlesData.flat() : [];
  const isLoadingMore =
    isLoading ||
    (size > 0 && articlesData && typeof articlesData[size - 1] === "undefined");
  const isEmpty = articlesData?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty ||
    (articlesData && articlesData[articlesData.length - 1]?.length < 10);

  //Change the date Formate
  var date = (date) => moment(date).format("YYYY/MM/DD");

  return (
    <div className="w-full h-full col-span-1 lg:col-span-2 lg:border-r-2 lg:border-black">
      <h2 className="font-bold text-left border-b-2 border-black px-1 py-2 m-0">
        Recent posts
      </h2>
      <div className="w-full h-full ">
        {articles.map((item) => (
          <Link
            key={item._id}
            href={`posts/${item.slug}`}
            className="border-b-2 relative no-underline border-black flex flex-col lg:flex-row items-start justify-start  py-4  w-full m-0"
          >
            <img
              src={item.image}
              alt={item.title}
              className="aspect-video rounded-md w-full lg:w-[400px]  md:h-[250px] "
            />
            <div className=" text-black flex flex-col items-start lg:justify-between p-4 gap-4 lg:gap-0 lg:h-[250px]">
              <h3 className="m-0 font-bold ">{item.title}</h3>
              <p className="m-0 text-black/70">
                {item.description.substring(0, 100)}
              </p>
              <div className="flex justify-between items-center w-full">
                <p className="m-0  font-semibold">{item.author}</p>
                <p className="m-0 font-semibold">on {date(item.createAt)}</p>
              </div>
            </div>
          </Link>
        ))}

        {/* Infinte Scroll Button */}
        <div className="flex items-center w-full justify-center p-6">
          <button
            disabled={isLoadingMore || isReachingEnd}
            onClick={() => setSize(size + 1)}
            className="px-4 cursor-pointer py-2 space-x-2 rounded text-white bg-zinc-900 "
          >
            {isLoadingMore ? (
              <div className="flex items-center justify-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                loading
              </div>
            ) : isReachingEnd ? (
              "no more posts"
            ) : (
              "load more"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentPosts;
