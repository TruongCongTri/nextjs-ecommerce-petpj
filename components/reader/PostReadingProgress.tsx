"use client";

import useProgress from "@/hooks/useProgress";
import React from "react";

const PostReadingProgress = () => {
  const { progress, enable } = useProgress(".article-content");

  return enable ? (
    <div
      className="fixed inset-x-0 lg:inset-x-(--sidebar-width) lg:group-has-[[data-collapsible=icon]]/sidebar-wrapper:inset-x-[47px] h-1 top-16 group-has-[[data-collapsible=icon]]/sidebar-wrapper:top-12 bg-blue-600 dark:bg-blue-500 z-50"
      style={{ width: `${progress}%` }}
    ></div>
  ) : null;
  return (
    <div className="fixed inset-x-0 h-1 top-16 bg-blue-600 dark:bg-blue-500 z-50" />
  );
};

export default PostReadingProgress;
