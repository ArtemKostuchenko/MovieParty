import React from "react";
import { Link } from "react-router-dom";
import { useGetVideoContentQuery } from "../../features/services/content/contentService";

const SearchPopup = ({ term, onHide }) => {
  const { data, isLoading } = useGetVideoContentQuery({
    title: term,
  });

  return (
    <div className="search__popup">
      <div className="search__popup-content">
        <div className="search__popup-title">Відеоконтент</div>
        {isLoading && <>Loading...</>}
        {!isLoading && data?.totalCount > 0 && (
          <div className="search__popup-items">
            {data.videoContent.map((vC) => {
              const {
                _id,
                title,
                previewURL,
                originTitle,
                typeVideoContent,
                IMDb,
                releaseDate,
              } = vC;

              const videoContentLink = `${import.meta.env.VITE_FRONT_HOST}/${
                typeVideoContent?.path ? typeVideoContent.path : "content"
              }/${originTitle.toLowerCase().replace(/\s/g, "-")}`;
              return (
                <Link
                  to={videoContentLink}
                  className="search__popup-item"
                  key={_id}
                  onClick={onHide}
                >
                  <div className="search__popup-item-preview">
                    <img
                      src={`${
                        import.meta.env.VITE_BACK_HOST
                      }/static/files/images/content/${previewURL}`}
                      alt={title}
                    />
                  </div>
                  <div className="search__popup-item-details">
                    <div className="search__popup-item-detail">
                      <div className="search__popup-item-title">{title}</div>
                      <div className="search__popup-item-type">
                        ({typeVideoContent?.name?.toLowerCase()})
                      </div>
                      <div className="search__popup-item-IMDb">
                        {IMDb.toFixed(1)}
                      </div>
                    </div>
                    <div className="search__popup-item-detail">
                      <div className="search__popup-item-origin-title">
                        {originTitle}
                      </div>
                      <div className="search__popup-item-year">
                        {new Date(releaseDate).getFullYear()}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
        {!isLoading && data?.totalCount === 0 && (
          <div className="search__popup-message">Нічого не знайдено</div>
        )}
      </div>
    </div>
  );
};

export default SearchPopup;
