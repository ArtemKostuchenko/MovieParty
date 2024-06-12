import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import "./style.component.scss";
import SearchPopup from "./SearchPopup";
import { setVisibleState } from "../../features/store/slices/search";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 730px)" });
  const dispatch = useDispatch();
  const { isVisible } = useSelector((store) => store.search);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef(null);

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const hideSearchOnMobile = () => {
    if (isTabletOrMobile && isVisible) {
      dispatch(setVisibleState(false));
    }
  };

  const handleClosePopUp = (event) => {
    if (!searchRef.current.contains(event.target)) {
      setIsFocused(false);
      hideSearchOnMobile();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClosePopUp);
    return () => {
      document.removeEventListener("mousedown", handleClosePopUp);
    };
  }, [isVisible]);

  return (
    <div className="header__search" ref={searchRef}>
      {!isTabletOrMobile && (
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
      )}
      {isTabletOrMobile && isVisible && (
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
                hideSearchOnMobile();
                setSearchTerm("");
                handleBlur();
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
