import React from "react";
import CommentItems from "../../../components/Comments/CommentItems";
import { useGetMyReviewsQuery } from "../../../features/services/users/usersService";

const CommentsPage = () => {
  return (
    <>
      <div className="profile-user-content-title">Мої коментарі</div>
      <div className="profile-user-content-container">
        <CommentItems
          limit={5}
          query={useGetMyReviewsQuery}
          includePagination
          editable
          removable
        />
      </div>
    </>
  );
};

export default CommentsPage;
