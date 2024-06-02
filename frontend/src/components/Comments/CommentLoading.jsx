import React from "react";
import CommentItem from "./CommentItem";

const CommentLoading = ({ limit }) => {
  return (
    <div className="user-comments-items">
      {Array.from({ length: limit }).map((_, index) => {
        return <CommentItem key={`comment-item-skeleton-${index}`} skeleton />;
      })}
    </div>
  );
};

export default CommentLoading;
