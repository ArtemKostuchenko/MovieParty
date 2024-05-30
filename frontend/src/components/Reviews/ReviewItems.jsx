import React from "react";
import Profile2 from "../../assets/profile-2.png";
import Avatar from "../../assets/avatar.png";
import { useGetReviewsByVideoContentIdQuery } from "../../features/services/reviews/reviewsService";
import Loader from "../Loader/Loader";
import ReviewItem from "./ReviewItem";
import useUser from "../../hooks/useUser";

const ReviewItems = ({ videoContentId, limit = 15 }) => {
  const { user } = useUser();
  const { data: reviews, isLoading } =
    useGetReviewsByVideoContentIdQuery(videoContentId);

  if (isLoading) {
    return <Loader />;
  }

  console.log(reviews);

  return (
    <div className="reviews__items">
      {reviews.map((review) => {
        const { _id, userId } = review;
        return (
          <ReviewItem
            key={_id}
            user={userId}
            {...review}
            ownReview={user._id === userId._id}
          />
        );
      })}
    </div>
  );
};

export default ReviewItems;
