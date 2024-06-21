"use client";
import Link from "next/link";
import React, { useState } from "react";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";

type PostType = {
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

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const PostsPage = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [filter, setFilter] = useState<string>("");

  const { data: postsData } = useSWR<PostType[][]>(
    `/api/posts?page=${pageIndex}`,
    fetcher
  );

  const posts: PostType[] = postsData ? postsData.flat() : [];
  const isEmpty = postsData?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (postsData && postsData[postsData.length - 1]?.length < 10);

  const filtredItems = posts.filter((item) => item.title == filter);
  console.log(filtredItems);

  return (
    <div>
      PostsPage
      <Link href={"/admin/posts/new"}>new</Link>
      <div className="mt-10">
        <div className="relative overflow-x-auto shadow-md rounded-lg">
          <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
            <label className="sr-only">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50  outline-none"
                placeholder="Search for items"
              />
            </div>
          </div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Post Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Author
                </th>
                <th scope="col" className="px-6 py-3">
                  Tag
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {posts?.map((item) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 overflow-x-auto max-w-sm font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.title}
                  </th>
                  <td className="px-6 py-4">{item.author}</td>
                  <td className="px-6 py-4">{item.tag}</td>
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
      <div className="flex  gap-4 my-4">
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
      </div>
    </div>
  );
};

export default PostsPage;

// const fetcher = async (url: string) => {
//   const res = await fetch(url);
//   return res.json();
// };

// const {
//   data: articlesData,
//   isLoading,
//   isValidating,
//   size,
//   setSize,
// } = useSWRInfinite<ArticlesType[]>(
//   (index) => `/api/articles?page=${index}`,
//   fetcher
// );

// const articles: ArticlesType[] = articlesData ? articlesData.flat() : [];
// const isLoadingMore =
//   isLoading ||
//   (size > 0 && articlesData && typeof articlesData[size - 1] === "undefined");
// const isEmpty = articlesData?.[0]?.length === 0;
// const isReachingEnd =
//   isEmpty ||
//   (articlesData && articlesData[articlesData.length - 1]?.length < 10);
