import React from "react";

const SortItem = ({ name, children, onClick, sortType, selected }) => {
  return (
    <div className="sort-item" onClick={onClick}>
      {children}
      <div
        className={`icon sort ${
          selected
            ? sortType === "asc"
              ? " up"
              : sortType === "desc"
              ? " down"
              : ""
            : ""
        }`}
      ></div>
    </div>
  );
};

export default SortItem;
