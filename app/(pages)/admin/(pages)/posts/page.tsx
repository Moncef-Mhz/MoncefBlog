import Link from "next/link";
import React from "react";

const PostsPage = () => {
  return (
    <div>
      PostsPage
      <Link href={"/admin/posts/new"}>new</Link>
    </div>
  );
};

export default PostsPage;
