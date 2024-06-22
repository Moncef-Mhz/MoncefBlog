import Link from "next/link";
import React from "react";

const TagsPage = () => {
  return (
    <div>
      TagsPage
      <Link href={"/admin/tags/new"}>new</Link>
    </div>
  );
};

export default TagsPage;
