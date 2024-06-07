import React, { useEffect, useState } from "react";
import "./style.component.scss";
import { disablePageScroll, enablePageScroll } from "scroll-lock";

const PopUp = ({ title = "PopUp", children, open, setOpen, grid = false }) => {
  const toggleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (open) {
      disablePageScroll();
    }

    return () => {
      enablePageScroll();
    };
  }, [open]);

  return (
    <div className={`popup ${open ? "po" : ""}`}>
      <div className={`popup__container${grid ? " p-grid" : ""}`}>
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
