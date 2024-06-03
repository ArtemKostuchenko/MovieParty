import React from "react";

const DropDownItem = ({
  children,
  selected = false,
  skeleton = false,
  value = "",
  onClick,
}) => {
  return (
    <div
      className={`dropdown__item${selected && !skeleton ? " selected" : ""}${
        skeleton ? " loader-skeleton dp-item" : ""
      }`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default DropDownItem;
