import React from "react";
import { useGetBestListsQuery } from "../../features/services/best-lists/bestListsService";
import useSearch from "../../hooks/useSearch";
import { useFieldArray } from "react-hook-form";

const SearchBestLists = ({ limit = 5, control, register }) => {
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
    queryFn: useGetBestListsQuery,
  });

  const {
    fields: lists,
    append: addList,
    remove: removeList,
  } = useFieldArray({
    control,
    name: "lists",
  });

  const handleChange = (item) => {
    const itemIndex = lists.findIndex((list) => list._id === item._id);

    if (itemIndex !== -1) {
      removeList(itemIndex);
    } else {
      addList(item);
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
            placeholder="Назва списку"
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
            {data.bestLists.map((item, index) => {
              const { _id, name } = item;

              return (
                <div
                  key={item._id}
                  ref={index === data.bestLists.length - 1 ? lastItemRef : null}
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
            {!isFetching && !Boolean(data.bestLists.length) && (
              <div className="container flex r center" style={{ height: 275 }}>
                <span className="message">Списків не знайдено</span>
              </div>
            )}
          </div>
        )}
      </div>
      {Boolean(lists.length) && (
        <div className="f-list r">
          {lists.map((list, index) => {
            const { name } = list;
            return (
              <div className="f-list__item top" key={list.id}>
                <div className="f-list__content">
                  <div className="f-list__best-lists">
                    <div className="f-list__content-title">
                      {`${index < 9 ? "0" : ""}${index + 1}`}
                      {". "}
                      {name}
                    </div>
                    <input
                      type="text"
                      {...register(`lists.${index}.placeInList`)}
                      className="form__input linear"
                      placeholder="Місце"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className="button remove rounded"
                  onClick={() => {
                    handleUnCheckItem(list);
                    removeList(index);
                  }}
                >
                  <div className="icon close" />
                </button>
              </div>
            );
          })}
        </div>
      )}
      {!Boolean(lists.length) && (
        <div className="f-list flex r center">
          <span className="message" style={{ margin: 0 }}>
            Жодних списків не додано
          </span>
        </div>
      )}
    </>
  );
};

export default SearchBestLists;
