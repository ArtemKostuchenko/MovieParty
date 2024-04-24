import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetVideoContentByOriginTitleQuery } from "../../features/services/content/contentService";

const WatchVideoContentPage = () => {
  const { originTitle: query } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetVideoContentByOriginTitleQuery(
    query.replace(/-/g, " ")
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const content = data.data;

  if (!content) {
    return <div>Content not found</div>;
  }

  const { soundTracks } = content;

  const handleBack = () => {
    const contentPageLink = `/${content.typeVideoContent}/${content.originTitle
      .toLowerCase()
      .replace(/\s/g, "-")}`;
    navigate(contentPageLink);
  };

  return (
    <div className="container">
      <div className="watch-content">
        <div className="watch-content__filter active" />
        <div className="watch-content__header">
          <button className="btp" onClick={handleBack}>
            <div className="icon arrow left" />
          </button>
          <div className="watch-content__title">{content.title}</div>
        </div>
        <div className="watch-content__player">
          <video controls>
            <source
              src="https://mdn.github.io/learning-area/html/multimedia-and-embedding/video-and-audio-content/rabbit320.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    </div>
  );
};

export default WatchVideoContentPage;
