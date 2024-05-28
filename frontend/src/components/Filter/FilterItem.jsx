import React from "react";

const FilterItem = ({ id, onClick, name, active = false }) => {
  return (
    <div
      className={`filter__item${active ? " active" : ""}`}
      onClick={() => {
        if (!onClick || typeof onClick !== "function") return;
        onClick(id);
      }}
    >
      <button>{name}</button>
    </div>
  );
};

export default FilterItem;
