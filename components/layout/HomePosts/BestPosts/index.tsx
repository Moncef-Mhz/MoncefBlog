import React from "react";
import { trendingPosts } from "@/constant";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
const BestPosts = () => {
  return (
    <div className="w-full h-full col-span-1 px-3">
      <h2 className="font-bold text-left px-1 py-2 m-0">Best of</h2>

      {/* Best article section */}
      <div className="flex flex-col w-full h-full">
        {trendingPosts.map((item) => (
          <Link
            href={`posts/${item.slug}`}
            className="items-center bg-white group hover:drop-shadow-2xl rounded-md p-4 duration-150 text-black no-underline"
          >
            {/* <img
              src={item.image}
              alt={item.title}
              className="h-[90px] aspect-video w-[100px] object-cover"
            /> */}
            <h4 className="font-semibold m-0">{item.title}</h4>
            <p className="text-blue-500 m-0  flex items-center ">
              read more <ChevronRight size={22} />
            </p>
          </Link>
        ))}
      </div>

      {/* SocialMedia section*/}
    </div>
  );
};

export default BestPosts;
