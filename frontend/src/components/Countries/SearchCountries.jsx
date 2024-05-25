// SearchComponent.js
import React, { useEffect } from "react";
import { useGetCountriesQuery } from "../../features/services/countries/countriesService";
import useSearch from "../../hooks/useSearch";
import { useFieldArray } from "react-hook-form";

const SearchCountries = ({ limit = 5, control }) => {
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
    queryFn: useGetCountriesQuery,
  });

  const {
    fields: originCountries,
    append: addOriginCountry,
    remove: removeOriginCountry,
  } = useFieldArray({
    control,
    name: "originCountries",
  });

  const handleChange = (item) => {
    const itemIndex = originCountries.findIndex(
      (originCountry) => originCountry._id === item._id
    );

    if (itemIndex !== -1) {
      removeOriginCountry(itemIndex);
    } else {
      addOriginCountry(item);
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
            {data.countries.map((item, index) => {
              const { _id, name } = item;
              const icon = `${
                import.meta.env.VITE_BACK_HOST
              }/static/files/crs/${item.icon}`;
              return (
                <div
                  key={item._id}
                  ref={index === data.countries.length - 1 ? lastItemRef : null}
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
                      <img src={icon} className="country-icon" alt={name} />
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
            {!isFetching && !Boolean(data.countries.length) && (
              <div className="container flex r center" style={{ height: 275 }}>
                <span className="message">Країну не знайдено</span>
              </div>
            )}
          </div>
        )}
      </div>
      {Boolean(originCountries.length) && (
        <div className="f-list">
          {originCountries.map((originCountry, index) => {
            const { _id, name } = originCountry;
            const icon = `${import.meta.env.VITE_BACK_HOST}/static/files/crs/${
              originCountry.icon
            }`;
            return (
              <div className="f-list__item" key={originCountry.id}>
                <div className="f-list__content">
                  <div className="flex r center-h g5">
                    <img src={icon} className="country-icon" alt={name} />
                    <div className="f-list__content-title">{name}</div>
                  </div>
                </div>
                <button
                  className="button remove rounded"
                  onClick={() => {
                    handleUnCheckItem(originCountry);
                    removeOriginCountry(index);
                  }}
                >
                  <div className="icon close" />
                </button>
              </div>
            );
          })}
        </div>
      )}
      {!Boolean(originCountries.length) && (
        <div className="f-list flex r center">
          <span className="message" style={{ margin: 0 }}>
            Жодних країн не додано
          </span>
        </div>
      )}
    </>
  );
};

export default SearchCountries;
