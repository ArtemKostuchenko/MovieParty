import React, { useEffect, useState } from "react";
import "./style.component.scss";

const PopUp = ({ title = "PopUp", children, open, setOpen }) => {
  const toggleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <div className={`popup ${open ? "po" : ""}`}>
      <div className="popup__container">
        <div className="popup__top">
          <div className="popup__title">{title}</div>
          <button onClick={toggleOpen} className="button icon transparent t i">
            <div className="icon close" />
          </button>
        </div>
        <div className="popup__content">{children}</div>
      </div>
    </div>
  );
};

export default PopUp;
