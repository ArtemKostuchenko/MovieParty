import React, { useEffect, useRef, useState } from "react";
import usePagination from "../../hooks/usePagination";
import DropDownItem from "./DropDownItem";

const DropDownLoader = ({
  value = "",
  placeholder = "Оберіть варіант",
  placeholderSearch = "Введіть назву",
  onChange = null,
  fill = false,
  linear = false,
  limit = 8,
  query,
  searchBy = "name",
  dataName,
}) => {
  const [selectedItem, setSelectedItem] = useState(value);
  const [selectedName, setSelectedName] = useState("Завантаження...");
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const listRef = useRef(null);

  const { page, handleChangePage } = usePagination();
  const { data, isLoading, isFetching } = query({
    limit: limit * page,
    [searchBy]: searchTerm,
  });

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const handleChangeItem = (value) => {
    if (value === selectedItem) return;

    setIsOpen(false);
    setSelectedItem(value);

    if (!onChange && typeof onChange !== "function") return;

    onChange(value);
  };

  const handleCloseDropDown = (event) => {
    if (!dropdownRef.current.contains(event.target)) {
      if (listRef.current) {
        listRef.current.scrollTo(1, 1);
      }
      handleChangePage(1);
      setIsOpen(false);
    }
  };

  const handleChangeSearch = (e) => {
    setSearchTerm(e.target.value.trim());
  };

  const handleScroll = () => {
    if (listRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listRef.current;
      if (scrollTop + clientHeight >= scrollHeight && !isFetching) {
        if (limit * page < data.totalCount) {
          handleChangePage(page + 1);
        }
      }
    }
  };

  useEffect(() => {
    if (value) {
      setSelectedItem(value);
    }
  }, [value]);

  useEffect(() => {
    document.addEventListener("mousedown", handleCloseDropDown);
    return () => {
      document.removeEventListener("mousedown", handleCloseDropDown);
    };
  }, []);

  useEffect(() => {
    if (selectedItem) {
      const name = items.find((item) => item._id === selectedItem)?.[searchBy];
      if (name) {
        setSelectedName(name);
      }
    }
  }, [selectedItem, items]);

  useEffect(() => {
    if (data && data[dataName]) {
      setItems(data[dataName]);
    }
  }, [data]);

  return (
    <div
      className={`dropdown${fill ? " fill" : ""}${linear ? " linear" : ""}${
        isOpen ? " dropdown-open" : ""
      }`}
      ref={dropdownRef}
    >
      <div className="dropdown__selected" onClick={() => toggleDropDown()}>
        <div className="dropdown__title">
          {selectedName ? selectedName : placeholder}
        </div>
        <div className="dropdown__icon">
          <div className="icon dd"></div>
        </div>
      </div>
      <div className="dropdown__search">
        <input
          type="text"
          className="form__input dropdown__search-input"
          value={searchTerm}
          onChange={handleChangeSearch}
          placeholder={placeholderSearch}
        />
        <div
          className="dropdown__search-items"
          ref={listRef}
          onScroll={handleScroll}
        >
          {isLoading && <DropDownItem skeleton />}
          {!isLoading &&
            items.map((item) => {
              return (
                <DropDownItem
                  key={item._id}
                  value={item._id}
                  selected={selectedItem === item._id}
                  onClick={() => handleChangeItem(item._id)}
                >
                  {item[searchBy]}
                </DropDownItem>
              );
            })}
          {isFetching && <DropDownItem skeleton />}
        </div>
      </div>
    </div>
  );
};

export default DropDownLoader;
