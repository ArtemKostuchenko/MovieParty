import React, { useEffect, useRef, useState } from "react";
import "./style.component.scss";
import SearchPopup from "./SearchPopup";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef(null);

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleClosePopUp = (event) => {
    if (!searchRef.current.contains(event.target)) {
      setIsFocused(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClosePopUp);
    return () => {
      document.removeEventListener("mousedown", handleClosePopUp);
    };
  }, []);

  return (
    <div className="header__search" ref={searchRef}>
      <div className="search">
        <div className="icon find"></div>
        <div className="search__input">
          {!searchTerm && (
            <label htmlFor="search">
              <span>Пошук </span>
              <span className="search__input-query">
                фільмів, серіалів тощо...
              </span>
            </label>
          )}
          <input
            onFocus={handleFocus}
            type="text"
            className="search__input"
            name="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {isFocused && searchTerm && (
          <SearchPopup
            term={searchTerm}
            onHide={() => {
              setSearchTerm("");
              handleBlur();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Search;
