import React from "react";
import NotFoundContentSvg from "../../assets/not-found-content.svg";
import NotFoundReviewsSvg from "../../assets/not-found-reviews.svg";
import NotFoundRoom from "../../assets/not-found-room.svg";

const NotFound = ({
  title,
  description = "",
  image = "default",
  height = 400,
  splitter = true,
}) => {
  return (
    <div className="container cnt-mn">
      <div className="info f-c-h">
        <div className="info__container">
          <div className="info__image">
            {image === "default" && (
              <img src={NotFoundContentSvg} alt={title} style={{ height }} />
            )}
            {image === "reviews" && (
              <img src={NotFoundReviewsSvg} alt={title} style={{ height }} />
            )}
            {image === "room" && (
              <img src={NotFoundRoom} alt={title} style={{ height }} />
            )}
          </div>
          <div className="info__title">{title}</div>
          <div className="info__description">
            {description
              ? description
              : "Якщо ви впевнені в цьому, то спробуйте пізніше, можливо це помилка розробника (малоймовірно)"}
          </div>
        </div>
      </div>
      {splitter && <div className="splitter"></div>}
    </div>
  );
};

export default NotFound;
