"use client";
import Link from "next/link";
import React, { useState } from "react";
import useSWR from "swr";

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

const DeleteHandler = async (id: string) => {
  const res = await fetch(`/api/posts`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
    }),
  });
  return { success: res.ok };
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

  return (
    <div>
      <h1 className="font-bold">Posts</h1>
      <div className="mt-10">
        <div className="relative overflow-x-auto shadow-md rounded-lg">
          <div className="flex items-center gap-4 w-full justify-between">
            <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
              <label className="sr-only">Search</label>
              <div className="relative">
                <input
                  type="text"
                  id="table-search"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50  outline-none"
                  placeholder="Search for items"
                />
              </div>
              <Link
                href={"/admin/posts/create"}
                className="no-underline  group-hover:text-black  rounded-md px-4 py-2 ml-4 group hover:bg-gray-200 duration-100 bg-gray-50 text-black"
              >
                Create
              </Link>
            </div>
          </div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Post Title
                </th>
                <th scope="col" className="px-6 py-3 hidden lg:block">
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
                <tr
                  key={item._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 overflow-x-auto max-w-sm font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.title}
                  </th>
                  <td className="px-6 py-4 hidden lg:block">{item.author}</td>
                  <td className="px-6 py-4">{item.tag}</td>
                  <td className="px-6 py-4 space-x-2">
                    <Link
                      href={`/admin/posts/edit/${item.slug}`}
                      className="font-medium text-blue-600 dark:text-blue-500 no-underline hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => DeleteHandler(item._id)}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      Delete
                    </button>
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
