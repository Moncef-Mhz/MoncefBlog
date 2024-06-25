"use client";
import Button from "@/components/ui/Button";
import { Icon, Search } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type Tag = {
  _id: string;
  name: string;
};

const TagsPage = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [filterdData, setFilterdData] = useState<Tag[]>([]);

  const { data: tags } = useSWR<Tag[]>("/api/tags", fetcher);

  // const HandlerFilter = (name:string) => {
  //   setSearchText(name);
  //   const filtredItems = tags.filter((item) => item.name === name);
  //   setFilterdData(filtredItems);
  // };
  return (
    <div>
      <h1>Tags</h1>

      <div className="mt-10 w-full">
        <div className="relative overflow-x-auto w-full shadow-md rounded-lg">
          <div className="flex items-center gap-4 w-full justify-between">
            <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
              <label className="sr-only">Search</label>
              {/* <Search color="black" className="absolute inset-0" /> */}
              <div className="relative">
                <input
                  type="text"
                  id="table-search"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50  outline-none"
                  placeholder="Search for items"
                />
              </div>
              <Link
                href={"/admin/tags/new"}
                className="no-underline  group-hover:text-black  rounded-md px-4 py-2 ml-4 group hover:bg-gray-200 duration-100 bg-gray-50 text-black"
              >
                new
              </Link>
            </div>
          </div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Tag Title
                </th>
                <th scope="col" className="px-6 py-3">
                  id
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {tags?.map((item) => (
                <tr
                  key={item._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 capitalize py-4 overflow-x-auto max-w-sm font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.name}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 overflow-x-auto max-w-sm font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item._id}
                  </th>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* <div className="flex  gap-4 my-4">
        <button
          onClick={() => setPageIndex(pageIndex - 1)}
          disabled={pageIndex === 0}
          className="text-white bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Previous
        </button>
        <button
          onClick={() => setPageIndex(pageIndex + 1)}
          disabled={isReachingEnd}
          className="text-white bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Next
        </button>
      </div> */}
    </div>
  );
};

export default TagsPage;
