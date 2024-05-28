import React from "react";
import { Link } from "react-router-dom";

const VideoContentCard = ({
  title,
  originTitle,
  previewURL,
  typeVideoContent,
  skeleton = false,
}) => {
  if (skeleton) {
    return (
      <div className="content__card">
        <div className="content__card-image loader-skeleton card-image"></div>
        <div className="content__card-title loader-skeleton card-title"></div>
      </div>
    );
  }

  const videoContentLink = `/${typeVideoContent}/${originTitle
    .toLowerCase()
    .replace(/\s/g, "-")}`;

  return (
    <Link to={videoContentLink} className="content__card">
      <div className="content__card-image">
        <img
          src={`${
            import.meta.env.VITE_BACK_HOST
          }/static/files/images/content/${previewURL}`}
          alt={title}
        />
      </div>
      <div className="content__card-title">{title}</div>
    </Link>
  );
};

export default VideoContentCard;
