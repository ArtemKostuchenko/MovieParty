import React from "react";

const ActionItem = ({ icon, title, onClick }) => {
  return (
    <button className="action-menu__item" onClick={onClick}>
      <div className={`icon ${icon}`}></div>
      <div className="action-menu__title">{title}</div>
    </button>
  );
};

export default ActionItem;
