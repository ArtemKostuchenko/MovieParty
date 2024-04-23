import React from "react";
import { Link } from "react-router-dom";

const VideoContentCard = ({
  title,
  originTitle,
  previewURL,
  typeVideoContent,
}) => {
  const videoContentLink = `/${typeVideoContent}/${originTitle
    .toLowerCase()
    .replace(/\s/g, "-")}`;

  return (
    <Link to={videoContentLink}>
      <div className="video-content-card">
        <div className="video-content-card__image">
          <img
            src={`${import.meta.env.VITE_BACK_HOST}/static${previewURL}`}
            alt={title}
          />
        </div>
        <div className="video-content-card__title">{title}</div>
      </div>
    </Link>
  );
};

export default VideoContentCard;
