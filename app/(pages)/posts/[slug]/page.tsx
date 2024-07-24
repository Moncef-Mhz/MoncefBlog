"use client";
import React, { useEffect, useState } from "react";

import { Gutter } from "@/components/layout/Gutter";
import useSWR from "swr";
import Image from "next/image";
import moment from "moment";

type article = {
  title: string;
  description: string;
  author: string;
  date: string;
  _id: string;
  slug: string;
  image: string;
  content: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ArticlePage = ({ params }) => {
  const slug = params["slug"];

  const { data: article, isLoading } = useSWR<article>(
    `/api/posts/${slug}`,
    fetcher
  );

  if (isLoading) {
    return (
      <h1 className="w-full grid place-content-center h-full py-96 ">
        loading...
      </h1>
    );
  }
  var date = moment(article.createdAt).format("YYYY/MM/DD");

  return (
    <>
      <head>
        <title>{article?.title}</title>
        <meta name="description" content={article?.description} />
      </head>
      <Gutter className="my-5 px-10">
        {article && (
          <div className="flex  flex-col items-center justify-center ">
            <div className="max-w-[935px]  h-full  space-y-5 ">
              <h1 className="text-3xl md:text-3xl leading-normal lg:text-6xl font-bold  text-center  capitalize">
                {article.title}
              </h1>
              <div className="flex items-center justify-around">
                <h5>
                  by <strong>{article.author}</strong>
                </h5>
                <h5>{date}</h5>
              </div>
              <div className="">
                <Image
                  width={1920}
                  height={1080}
                  src={article.image}
                  className=" w-full h-full object-cover"
                  alt={article.title}
                />
              </div>
              <div className="flex px-4 items-center w-full justify-center">
                <div
                  className="max-w-[935px] "
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </div>
            </div>
          </div>
        )}
      </Gutter>
    </>
  );
};

export default ArticlePage;
