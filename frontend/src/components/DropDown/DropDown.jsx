import React, { useState, useEffect, useRef } from "react";
import DropDownItem from "./DropDownItem";

const DropDown = ({
  children,
  value = "",
  placeholder = "Оберіть варіант",
  onChange = null,
  fill = false,
  linear = false,
}) => {
  const [selectedItem, setSelectedItem] = useState(
    children.find(
      (child) => child.props?.value === value || child.props?.selected
    )
  );

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const handleChangeItem = (child) => {
    if (child === selectedItem) return;

    setSelectedItem(child);
    setIsOpen(false);

    if (onChange && typeof onChange === "function") {
      onChange(child.props?.value);
    }
  };

  const handleCloseDropDown = (event) => {
    if (!dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleCloseDropDown);
    return () => {
      document.removeEventListener("mousedown", handleCloseDropDown);
    };
  }, []);

  useEffect(() => {
    setSelectedItem(
      children.find(
        (child) => child.props?.value === value || child.props?.selected
      )
    );
  }, [value]);

  return (
    <div
      className={`dropdown${fill ? " fill" : ""}${linear ? " linear" : ""}${
        isOpen ? " dropdown-open" : ""
      }`}
      ref={dropdownRef}
    >
      <div className="dropdown__selected" onClick={() => toggleDropDown()}>
        <div className="dropdown__title">
          {selectedItem ? selectedItem.props.children : placeholder}
        </div>
        <div className="dropdown__icon">
          <svg
            width={14}
            height={9}
            viewBox="0 0 14 9"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.938664 0.727821C1.32889 0.337597 1.96146 0.337252 2.35211 0.72705L6.29366 4.66002C6.68401 5.04952 7.31599 5.04952 7.70634 4.66002L11.6479 0.72705C12.0385 0.337253 12.6711 0.337597 13.0613 0.72782L13.2929 0.959377C13.6834 1.3499 13.6834 1.98307 13.2929 2.37359L7.70711 7.95938C7.31658 8.3499 6.68342 8.3499 6.29289 7.95938L0.707106 2.37359C0.316582 1.98307 0.316582 1.3499 0.707107 0.959377L0.938664 0.727821Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
      <div className="dropdown__list">
        {children.map((child, index) => {
          return (
            <DropDownItem
              key={index}
              selected={selectedItem === child}
              skeleton={child.props?.skeleton}
              onClick={() => handleChangeItem(child)}
            >
              {child.props?.children}
            </DropDownItem>
          );
        })}
      </div>
    </div>
  );
};

export default DropDown;
