import React from "react";
import VideoContentCard from "./VideoContentCard";

const VideoContentItems = ({ items }) => {
  return (
    <div className="video-content__items">
      {items.map((item) => {
        return <VideoContentCard key={item._id} {...item} />;
      })}
    </div>
  );
};

export default VideoContentItems;
