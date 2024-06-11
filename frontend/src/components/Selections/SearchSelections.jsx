import React from "react";
import { useGetVideoContentQuery } from "../../features/services/content/contentService";
import useSearch from "../../hooks/useSearch";
import { useFieldArray } from "react-hook-form";

const SearchSelections = ({ limit = 5, control }) => {
  const {
    containerRef,
    searchTerm,
    handleInputChange,
    handleFocus,
    isFocused,
    data,
    isFetching,
    lastItemRef,
    handleCheckboxChange,
    handleScroll,
    listRef,
    handleUnCheckItem,
  } = useSearch({
    limit,
    queryFn: useGetVideoContentQuery,
    name: "title",
  });

  const {
    fields: videoContents,
    append: addVideoContent,
    remove: removeVideoContent,
  } = useFieldArray({
    control,
    name: "videoContents",
  });

  const handleChange = (item) => {
    const itemIndex = videoContents.findIndex(
      (videoContent) => videoContent._id === item._id
    );

    if (itemIndex !== -1) {
      removeVideoContent(itemIndex);
    } else {
      addVideoContent(item);
    }

    handleCheckboxChange(item);
  };

  const isChecked = (id) => {
    return videoContents.some((videoContent) => videoContent._id === id);
  };

  return (
    <>
      <div ref={containerRef} className="search-list">
        <div className="form__input linear fi">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={handleFocus}
            className="form__input"
            placeholder="Назва відеоконтенту"
          />
          <button className="form__button-add">
            <div className="icon plus rounded" />
          </button>
        </div>
        {isFocused && data && (
          <div
            className="search-list__items"
            ref={listRef}
            onScroll={handleScroll}
          >
            {data.videoContent.map((item, index) => {
              const { _id, title } = item;

              return (
                <div
                  key={item._id}
                  ref={
                    index === data.videoContent.length - 1 ? lastItemRef : null
                  }
                  className="search-list__item"
                >
                  <div className="form__item flex r h-center g10">
                    <div className="checkbox">
                      <div className="checkbox__container">
                        <input
                          type="checkbox"
                          checked={isChecked(_id)}
                          onChange={() => handleChange(item)}
                          id={_id}
                        />
                        <span className="checkmark"></span>
                      </div>
                    </div>
                    <label htmlFor={_id} className="flex r h-center">
                      <div className="f-list__content-title">{title}</div>
                    </label>
                  </div>
                </div>
              );
            })}
            {isFetching && (
              <div className="container f center" style={{ height: 275 }}>
                <div className="loader__container">
                  <div className="loader"></div>
                </div>
              </div>
            )}
            {!isFetching && !Boolean(data.videoContent.length) && (
              <div className="container flex r center" style={{ height: 275 }}>
                <span className="message">Відеоконтент не знайдено</span>
              </div>
            )}
          </div>
        )}
      </div>
      {Boolean(videoContents.length) && (
        <div className="f-list">
          {videoContents.map((videoContent, index) => {
            const { _id, title } = videoContent;
            return (
              <div className="f-list__item" key={_id}>
                <div className="f-list__content">
                  <div className="f-list__content-title">{title}</div>
                </div>
                <button
                  className="button remove rounded"
                  onClick={() => {
                    handleUnCheckItem(videoContent);
                    removeVideoContent(index);
                  }}
                >
                  <div className="icon close" />
                </button>
              </div>
            );
          })}
        </div>
      )}
      {!Boolean(videoContents.length) && (
        <div className="f-list flex r center">
          <span className="message" style={{ margin: 0 }}>
            Жодного відеоконтенту не додано
          </span>
        </div>
      )}
    </>
  );
};

export default SearchSelections;
