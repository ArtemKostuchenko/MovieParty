import React from "react";
import { useGetSelectionsQuery } from "../../features/services/selections/selectionsService";
import SelectionItem from "./SelectionItem";
import { Pagination } from "../Pagination";
import { Sort, SortItem } from "../Sort";
import useSort from "../../hooks/useSort";
import usePagination from "../../hooks/usePagination";

const SelectionList = ({ limit = 5, name = "" }) => {
  const { sortName, sortType, handleChangeSort } = useSort();
  const { page, handleChangePage } = usePagination();

  const { data, isLoading, isError } = useGetSelectionsQuery({
    name,
    page,
    limit,
    sortName,
    sortType,
  });

  if (isLoading) {
    return (
      <>
        <div className="loader__container">
          <div className="loader"></div>
        </div>
        <Pagination page={page} limit={limit} totalCount={1} />
      </>
    );
  }

  if (isError) {
    return <div className="overflow-content">Error...</div>;
  }

  const { selections, totalCount } = data;

  return (
    <div className="overflow-content">
      <div className="view-items">
        <div className="view-row head">
          <Sort
            onChange={(sortName, sortType) => {
              handleChangeSort(sortName, sortType);
            }}
            sortName={sortName}
            sortType={sortType}
          >
            <SortItem name="name">
              <div className="view-col">Назва підбірки</div>
            </SortItem>
            <SortItem name="contentCount">
              <div className="view-col">Кількість контенту</div>
            </SortItem>
            <SortItem name="createdAt">
              <div className="view-col">Дата додавання</div>
            </SortItem>
          </Sort>
          <div className="view-col">Дії</div>
        </div>
        {selections.length !== limit &&
          Array.from({ length: limit }).map((_, index) => {
            if (selections.length > index) {
              const selection = selections[index];
              return <SelectionItem key={selection._id} {...selection} />;
            } else {
              return <SelectionItem key={`skeleton-genre-${index}`} skeleton />;
            }
          })}
        {selections.length === limit &&
          selections.map((selection) => (
            <SelectionItem key={selection._id} {...selection} />
          ))}
      </div>
      <Pagination
        page={page}
        limit={limit}
        totalCount={totalCount}
        onChangePage={(ePage) => handleChangePage(ePage)}
      />
    </div>
  );
};

export default SelectionList;
