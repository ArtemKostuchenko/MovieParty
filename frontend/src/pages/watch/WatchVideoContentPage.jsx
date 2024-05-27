import React from "react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";
import { useGetVideoContentByOriginTitleQuery } from "../../features/services/content/contentService";
import "./style.page.scss";

const WatchVideoContentPage = () => {
  const { originTitle: query } = useParams();
  const navigate = useNavigate();

  const {
    data: content,
    isLoading,
    error,
  } = useGetVideoContentByOriginTitleQuery(query.replace(/-/g, " "));

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
          <button className="button icon i t white" onClick={handleBack}>
            <div className="icon arrow left" />
          </button>
          <div className="watch-content__title">{content.title}</div>
        </div>
        <div className="watch-content__player">
          <ReactPlayer
            controls
            url={soundTracks[0].m3u8Links[0].m3u8URL}
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </div>
  );
};

export default WatchVideoContentPage;
