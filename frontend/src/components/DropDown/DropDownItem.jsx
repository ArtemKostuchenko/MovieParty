import React from "react";

const DropDownItem = ({ children, selected = false, value = "", onClick }) => {
  return (
    <div
      className={`dropdown__item${selected ? " selected" : ""}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default DropDownItem;
