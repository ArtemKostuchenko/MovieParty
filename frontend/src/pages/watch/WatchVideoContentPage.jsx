import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetVideoContentByOriginTitleQuery } from "../../features/services/content/contentService";
import "./style.page.scss";
import { NotFound, VideoPlayer } from "../../components";

const WatchVideoContentPage = () => {
  const { originTitle: query } = useParams();
  const navigate = useNavigate();

  const {
    data: content,
    isLoading,
    error,
  } = useGetVideoContentByOriginTitleQuery(query.replace(/-/g, " "));

  if (isLoading) {
    return (
      <div className="loader__fixed">
        <div className="loader"></div>
      </div>
    );
  }

  if (!content) {
    return <NotFound title="Відеоконтент не знайдено" />;
  }

  const { soundTracks, seasons } = content;

  const handleBack = () => {
    const contentPageLink = `/${
      content.typeVideoContent.path
    }/${content.originTitle.toLowerCase().replace(/\s/g, "-")}`;
    navigate(contentPageLink);
  };

  return (
    <div className="container">
      <div className="watch-content">
        <div className="watch-content__header">
          <button className="button icon i t white" onClick={handleBack}>
            <div className="icon arrow left" />
          </button>
          <div className="watch-content__title">{content.title}</div>
        </div>
        <div className="watch-content__player">
          <VideoPlayer seasons={seasons} soundTracks={soundTracks} />
        </div>
      </div>
    </div>
  );
};

export default WatchVideoContentPage;
