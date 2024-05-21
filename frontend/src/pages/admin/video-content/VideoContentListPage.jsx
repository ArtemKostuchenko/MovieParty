import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.page.scss";
import { VideoContentList } from "../../../components";
import usePopup from "../../../hooks/usePopup";

const VideoContentListPage = () => {
  const { removeId } = usePopup();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");

  const handleSearch = (e) => {
    const timer = setTimeout(() => {
      setTitle(e.target.value);
    }, 500);

    return () => clearTimeout(timer);
  };

  return (
    <>
      <div className="profile-user-content-title">Відеоконтент</div>
      <div className="profile-user-content-container">
        <div className="video-content-list">
          <div className="view">
            <div className="view-actions">
              <button
                className="button primary"
                onClick={() => navigate("add")}
              >
                Додати відеоконтент
              </button>
              <div className="view-filters">
                <div className="form">
                  <div className="form__item">
                    <div className="form__input__icon g8">
                      <div className="icon find" />
                      <input
                        type="text"
                        placeholder="Пошук..."
                        onChange={handleSearch}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <VideoContentList limit={8} title={title} />
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoContentListPage;
