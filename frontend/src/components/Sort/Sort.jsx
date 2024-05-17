import React, { useEffect, useRef, useState } from "react";
import SortItem from "./SortItem";

const Sort = ({ onChange, sortName: name, sortType: type, children }) => {
  const [sortType, setSortType] = useState(type);
  const [sortName, setSortName] = useState(name);

  const handleSort = (childSortName) => {
    let name = sortName;
    let type = sortName;

    if (childSortName === sortName) {
      if (sortType === "asc") {
        type = "desc";
      } else if (sortType === "desc") {
        type = "";
      } else {
        type = "asc";
      }
    } else {
      name = childSortName;
      type = "asc";
    }
    setSortType(type);
    if (childSortName !== sortName) setSortName(name);
    if (onChange && typeof onChange === "function") {
      onChange(name, type);
    }
  };

  return (
    <>
      {children.map((child) => {
        const { name: childSortName } = child.props;
        return (
          <SortItem
            key={`sort_${childSortName?.toLowerCase()}`}
            {...child.props}
            selected={childSortName === sortName}
            sortType={sortType}
            onClick={() => {
              const childOnClick = child.props?.onClick;
              if (childOnClick && typeof childOnClick === "function") {
                childOnClick();
              }
              handleSort(childSortName);
            }}
          >
            {child.props.children}
          </SortItem>
        );
      })}
    </>
  );
};

export default Sort;
