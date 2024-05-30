import React from "react";
import Avatar from "../../assets/avatar.png";
import { getCommentTime } from "../../features/utils/functions";
import useReview from "../../hooks/useReview";

const ReviewItem = ({
  _id,
  user,
  createdAt,
  updatedAt,
  message,
  likes,
  dislikes,
  edited,
  ownReview,
}) => {
  const { likeReview, isLoadingLike, dislikeReview, isLoadingDisLike } =
    useReview();
  const createdAtDate = new Date(createdAt);
  const updatedAtDate = new Date(updatedAt);
  const relativeTime = getCommentTime(createdAtDate, updatedAtDate, edited);

  const handleLikeClick = async () => {
    if (ownReview) return;
    const res = await likeReview(_id);
    console.log(res);
  };

  const handleDisLikeClick = async () => {
    if (ownReview) return;
    const res = await dislikeReview(_id);
    console.log(res);
  };

  return (
    <div className="reviews__item">
      <div className={`review${ownReview ? " owner" : ""}`}>
        <div className="review__owner">
          <div className="review__profile">
            <div className="profile profile__avatar">
              <img src={Avatar} alt="Qwerty" />
            </div>
            <h2 className="profile__name">{user.nickname}</h2>
          </div>
          <span className="review__splitter circle" />
          <div className="review__date">{relativeTime}</div>
        </div>
        <div className="review__comment">{message}</div>
        <div className="review__rating">
          <div className="review__likes">
            <button
              className="button icon i t"
              disabled={ownReview || isLoadingLike}
              onClick={handleLikeClick}
            >
              <div className="icon like" />
            </button>
            <div className="review__rating-count">{likes}</div>
          </div>
          <div className="review__dislikes">
            <button
              className="button icon i t"
              disabled={ownReview || isLoadingDisLike}
              onClick={handleDisLikeClick}
            >
              <div className="icon dislike" />
            </button>
            <div className="review__rating-count">{dislikes}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
