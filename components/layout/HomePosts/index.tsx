"use client";
import React from "react";
import BestPosts from "./BestPosts";
import RecentPosts from "./RecentPosts";

const HomePosts = () => {
  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 relative my-4">
      {/* Recent posts */}
      <RecentPosts />
      {/* Best Posts */}
      <BestPosts />
    </div>
  );
};

export default HomePosts;
