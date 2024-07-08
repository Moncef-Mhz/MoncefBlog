"use client";
import EditPostsClient from "@/components/layout/EditPosts";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import useSWR from "swr";

type PostType = {
  _id: string;
  title: string;
  slug: string;
  content: string;
  description: string;
  image: string;
  author: string;
  tag: string;
};
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const EditPosts = () => {
  const path = usePathname();
  const slug = path.split("/")[4];

  const { data, isLoading } = useSWR<PostType>(`/api/posts/${slug}`, fetcher);
  return <EditPostsClient data={data} />;
};

export default EditPosts;
