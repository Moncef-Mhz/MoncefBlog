"use client";
import { Gutter } from "@/components/layout/Gutter";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import React, { useRef, useState } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

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
};

const Search = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [filterdData, setFilterdData] = useState<PostsType[]>([]);

  const { data: articles, error } = useSWR<PostsType[]>("/api/posts", fetcher);

  const handleFilter = (filter: string) => {
    setSearchText(filter);
    const filtered = articles.filter((article) => {
      return article.title.toLowerCase().includes(filter.toLowerCase());
    });
    setFilterdData(filtered);
  };

  return (
    <Gutter className="my-6 ">
      <div className="max-w-md relative">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <SearchIcon className="text-gray-900" size={20} />
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm outline-none text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500   "
            placeholder="Search Articles"
            value={searchText}
            autoComplete="off"
            onChange={(e) => handleFilter(e.target.value)}
          />
          {searchText && (
            <div className="absolute border border-black bg-gray-50 w-full flex gap-2 flex-col p-2 max-h-[300px] drop-shadow-lg z-10 mt-2 rounded-lg overflow-y-scroll">
              {error && <span>Failed to load</span>}
              {filterdData.length === 0 ? (
                <div className="grid place-content-center">not found</div>
              ) : (
                filterdData.map((item) => (
                  <Link
                    href={`/posts/${item.slug}`}
                    key={item._id}
                    className="flex hover:bg-gray-50 duration-75 items-center no-underline gap-2 m-0 justify-start w-full"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      //   width={100}
                      //   height={100}
                      className="rounded-md aspect-square object-cover w-[100px] h-[100px]"
                    />
                    <div>
                      <h3 className="text-sm m-0 font-semibold text-gray-900">
                        {item.title}
                      </h3>
                      <p className="m-0 text-black/70 text-xs">
                        {item.description.substring(0, 100)}
                      </p>
                    </div>
                  </Link>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </Gutter>
  );
};

export default Search;
