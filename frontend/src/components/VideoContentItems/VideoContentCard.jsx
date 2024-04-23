import React from "react";

const VideoContentCard = ({ title, originalTitle, previewURL }) => {
  return (
    <div className="video-content-card">
      <div className="video-content-card__image">
        <img src={previewURL} alt={title} />
      </div>
      <div className="video-content-card__title">{title}</div>
    </div>
  );
};

export default VideoContentCard;
