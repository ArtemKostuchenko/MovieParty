import React from "react";
import { useGetPartsQuery } from "../../features/services/parts/partsService";
import useSearch from "../../hooks/useSearch";
import { useFieldArray } from "react-hook-form";

const SearchParts = ({ limit = 5, control, single = false }) => {
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
    queryFn: useGetPartsQuery,
    single,
  });

  const {
    fields: parts,
    append: addPart,
    remove: removePart,
  } = useFieldArray({
    control,
    name: "parts",
  });

  const handleChange = (item) => {
    const itemIndex = parts.findIndex((part) => part._id === item._id);

    if (single) {
      if (itemIndex !== -1) {
        removePart(itemIndex);
        handleCheckboxChange(item);
      } else {
        parts.forEach((_, index) => {
          removePart(index);
        });
        addPart(item);

        handleCheckboxChange(item);
      }
    } else {
      if (itemIndex !== -1) {
        removePart(itemIndex);
      } else {
        addPart(item);
      }

      handleCheckboxChange(item);
    }
  };

  const isChecked = (id) => {
    return parts.some((part) => part._id === id);
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
            placeholder="Назва частини"
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
            {data.parts.map((item, index) => {
              const { _id, name } = item;

              return (
                <div
                  key={item._id}
                  ref={index === data.parts.length - 1 ? lastItemRef : null}
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
                    <label htmlFor={_id} className="flex r h-center g10">
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
            {!isFetching && !Boolean(data.parts.length) && (
              <div className="container flex r center" style={{ height: 275 }}>
                <span className="message">Частини не знайдено</span>
              </div>
            )}
          </div>
        )}
      </div>
      {Boolean(parts.length) && (
        <div className="f-list r">
          {parts.map((part, index) => {
            const { name } = part;
            return (
              <div className="f-list__item full colorized mg" key={part.id}>
                <div className="f-list__content">
                  <div className="f-list__content-title">{name}</div>
                </div>
                <button
                  type="button"
                  className="button remove rounded"
                  onClick={() => {
                    handleUnCheckItem(part);
                    removePart(index);
                  }}
                >
                  <div className="icon close" />
                </button>
              </div>
            );
          })}
        </div>
      )}
      {!Boolean(parts.length) && (
        <div className="f-list flex r center">
          <span className="message" style={{ margin: 0 }}>
            {single ? "Частини не додано" : "Жодних частин не додано"}
          </span>
        </div>
      )}
    </>
  );
};

export default SearchParts;
