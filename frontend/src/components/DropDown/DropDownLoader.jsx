import React, { useState } from "react";
import DropDown from "./DropDown";
import DropDownItem from "./DropDownItem";
import usePagination from "../../hooks/usePagination";

const DropDownLoader = ({
  value = "",
  query,
  limit = 8,
  searchBy = "name",
  arrayName,
  placeholder = "Оберіть варіант",
  onChange,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { page } = usePagination();
  const { data, isLoading, isFetching } = query({
    limit,
    [searchBy]: searchTerm,
  });

  if (isLoading) {
    return <>Loading...</>;
  }

  const handleOnChange = (value) => {
    if (!onChange || typeof onChange !== "function") return;
    onChange(value);
  };

  console.log(value);

  const items = data[arrayName];
  const { totalCount } = data;

  return (
    <div className="dp-loader">
      <DropDown
        value={value}
        placeholder={placeholder}
        onChange={handleOnChange}
        linear
        fill
        includeSearch
      >
        {items.map((item) => {
          return (
            <DropDownItem key={item._id} value={item._id}>
              {item[searchBy]}
            </DropDownItem>
          );
        })}
        {isFetching && <DropDownItem skeleton />}
      </DropDown>
    </div>
  );
};

export default DropDownLoader;
