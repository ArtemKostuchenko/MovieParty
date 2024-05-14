import React, { useState, useRef, useEffect } from "react";
import ActionItem from "./ActionItem";

const ActionMenu = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const actionMenuRef = useRef(null);

  const toggleActionMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseActionMenu = (event) => {
    if (!actionMenuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleCloseActionMenu);
    return () => {
      document.removeEventListener("mousedown", handleCloseActionMenu);
    };
  }, []);

  const handleClick = () => {
    setIsOpen(false);
  };

  return (
    <div
      className={`action-menu${isOpen ? " active" : ""}`}
      ref={actionMenuRef}
    >
      <button
        className="action-menu__button"
        onClick={() => toggleActionMenu()}
      >
        <div className="icon action" />
      </button>
      <div className="action-menu__container">
        <div className="action-menu__items">
          {children.map((child, index) => {
            return (
              <ActionItem
                key={index}
                {...child.props}
                onClick={() => {
                  child.props.onClick();
                  handleClick();
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ActionMenu;
