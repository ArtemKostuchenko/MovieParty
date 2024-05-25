import React from "react";
import { useGetGenresQuery } from "../../features/services/genre/genreService";
import useSearch from "../../hooks/useSearch";
import { useFieldArray } from "react-hook-form";

const SearchGenres = ({ limit = 5, control }) => {
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
    queryFn: useGetGenresQuery,
  });

  const {
    fields: genres,
    append: addGenre,
    remove: removeGenre,
  } = useFieldArray({
    control,
    name: "genres",
  });

  const handleChange = (item) => {
    const itemIndex = genres.findIndex((genre) => genre._id === item._id);

    if (itemIndex !== -1) {
      removeGenre(itemIndex);
    } else {
      addGenre(item);
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
            placeholder="Назва країни"
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
            {data.genres.map((item, index) => {
              const { _id, name } = item;

              return (
                <div
                  key={item._id}
                  ref={index === data.genres.length - 1 ? lastItemRef : null}
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
                    <label htmlFor={_id} className="flex r h-center">
                      <div className="f-list__content-title">{name}</div>
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
            {!isFetching && !Boolean(data.genres.length) && (
              <div className="container flex r center" style={{ height: 275 }}>
                <span className="message">Жанрів не знайдено</span>
              </div>
            )}
          </div>
        )}
      </div>
      {Boolean(genres.length) && (
        <div className="f-list">
          {genres.map((genre, index) => {
            const { name } = genre;
            return (
              <div className="f-list__item" key={genre.id}>
                <div className="f-list__content">
                  <div className="f-list__content-title">{name}</div>
                </div>
                <button
                  className="button remove rounded"
                  onClick={() => {
                    handleUnCheckItem(genre);
                    removeGenre(index);
                  }}
                >
                  <div className="icon close" />
                </button>
              </div>
            );
          })}
        </div>
      )}
      {!Boolean(genres.length) && (
        <div className="f-list flex r center">
          <span className="message" style={{ margin: 0 }}>
            Жодних жанрів не додано
          </span>
        </div>
      )}
    </>
  );
};

export default SearchGenres;
