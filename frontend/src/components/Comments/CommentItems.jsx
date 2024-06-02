import React from "react";
import CommentItem from "./CommentItem";
import CommentLoading from "./CommentLoading";
import NotFound from "../NotFound/NotFound";
import Pagination from "../Pagination/Pagination";
import usePagination from "../../hooks/usePagination";

const CommentItems = ({
  userId = "",
  query,
  limit = 4,
  editable = false,
  removable = false,
  includePagination = false,
}) => {
  const { page, handleChangePage } = usePagination();
  const { data, isLoading } = query(userId);

  if (isLoading) {
    return <CommentLoading limit={limit} />;
  }

  const { reviews, totalCount } = data;

  if (!Boolean(totalCount)) {
    return (
      <NotFound
        title="У вас поки немає коментарів"
        description="Залиште коментар і він тут з`явиться"
        height={200}
        image="reviews"
        splitter={false}
      />
    );
  }

  return (
    <>
      <div className="user-comments-items">
        {reviews.map((review) => {
          return (
            <CommentItem
              key={review._id}
              {...review}
              editable={editable}
              removable={removable}
            />
          );
        })}
      </div>
      {includePagination && totalCount > limit && (
        <div className="content__pagination">
          <Pagination
            page={page}
            limit={limit}
            totalCount={totalCount}
            onChangePage={(page) => handleChangePage(page)}
          />
        </div>
      )}
    </>
  );
};

export default CommentItems;
