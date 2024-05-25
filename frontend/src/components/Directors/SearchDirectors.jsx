import React from "react";
import { useGetDirectorsQuery } from "../../features/services/directors/directorsService";
import useSearch from "../../hooks/useSearch";
import { useFieldArray } from "react-hook-form";

const SearchDirectors = ({ limit = 5, control }) => {
  const {
    selectedItems,
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
    queryFn: useGetDirectorsQuery,
    name: "fullName",
  });

  const {
    fields: directors,
    append: addDirector,
    remove: removeDirector,
  } = useFieldArray({
    control,
    name: "directors",
  });

  const handleChange = (item) => {
    const itemIndex = directors.findIndex(
      (director) => director._id === item._id
    );

    if (itemIndex !== -1) {
      removeDirector(itemIndex);
    } else {
      addDirector(item);
    }

    handleCheckboxChange(item);
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
            placeholder="Прізвище, ім`я режисера"
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
            {data.directors.map((item, index) => {
              const { _id, firstName, lastName, firstNameEng, lastNameEng } =
                item;
              const photoURL = `${
                import.meta.env.VITE_BACK_HOST
              }/static/files/images/directors/${item.photoURL}`;
              return (
                <div
                  key={item._id}
                  ref={index === data.directors.length - 1 ? lastItemRef : null}
                  className="search-list__item"
                >
                  <div className="form__item flex r h-center g10">
                    <div className="checkbox">
                      <div className="checkbox__container">
                        <input
                          type="checkbox"
                          checked={!!selectedItems[_id]}
                          onChange={() => handleChange(item)}
                          id={_id}
                        />
                        <span className="checkmark"></span>
                      </div>
                    </div>
                    <label htmlFor={_id} className="flex r h-center g10">
                      <div className="f-list__person">
                        <img
                          src={photoURL}
                          className="f-list__person-image"
                          alt={`${firstName} ${lastName}`}
                        />
                        <div className="f-list__person-info">
                          <div className="f-list__person-fullname">
                            {firstName} {lastName}
                          </div>
                          <div className="f-list__person-origin-fullname">
                            {firstNameEng} {lastNameEng}
                          </div>
                        </div>
                      </div>
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
            {!isFetching && !Boolean(data.directors.length) && (
              <div className="container flex r center" style={{ height: 275 }}>
                <span className="message">Режисерів не знайдено</span>
              </div>
            )}
          </div>
        )}
      </div>
      {Boolean(directors.length) && (
        <div className="f-list">
          {directors.map((director, index) => {
            const { firstName, lastName, firstNameEng, lastNameEng } = director;
            const photoURL = `${
              import.meta.env.VITE_BACK_HOST
            }/static/files/images/directors/${director.photoURL}`;

            return (
              <div className="f-list__item top" key={director.id}>
                <div className="f-list__content">
                  <div className="f-list__person">
                    <img
                      src={photoURL}
                      className="f-list__person-image"
                      alt={`${firstName} ${lastName}`}
                    />
                    <div className="f-list__person-info">
                      <div className="f-list__person-fullname">
                        {firstName} {lastName}
                      </div>
                      <div className="f-list__person-origin-fullname">
                        {firstNameEng} {lastNameEng}
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  className="button remove rounded"
                  onClick={() => {
                    handleUnCheckItem(director);
                    removeDirector(index);
                  }}
                >
                  <div className="icon close" />
                </button>
              </div>
            );
          })}
        </div>
      )}
      {!Boolean(directors.length) && (
        <div className="f-list flex r center">
          <span className="message" style={{ margin: 0 }}>
            Жодних режисерів не додано
          </span>
        </div>
      )}
    </>
  );
};

export default SearchDirectors;
