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
          <div className="icon dd"></div>
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
