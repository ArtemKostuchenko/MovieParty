import React from "react";
import VideoContentCard from "./VideoContentCard";

const VideoContentItems = ({ items }) => {
  console.log(items);
  return (
    <div className="content__cards">
      {items.map((item) => {
        return <VideoContentCard key={item._id} {...item} />;
      })}
    </div>
  );
};

export default VideoContentItems;
