"use client";
import React, { useState } from "react";

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

const Trending = () => {
  const [BestArticles, setBestArticles] = useState([]);

  return (
    <div>
      <h1 className="font-bold">Trending</h1>
      <p>chose</p>
    </div>
  );
};

export default Trending;
