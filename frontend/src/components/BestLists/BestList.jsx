import React from "react";
import { useGetBestListsQuery } from "../../features/services/best-lists/bestListsService";
import BestListItem from "./BestListItem";
import { Pagination } from "../Pagination";
import { Sort, SortItem } from "../Sort";
import useSort from "../../hooks/useSort";
import usePagination from "../../hooks/usePagination";

const BestList = ({ limit = 5, name = "" }) => {
  const { sortName, sortType, handleChangeSort } = useSort();
  const { page, handleChangePage } = usePagination();

  const { data, isLoading, isError } = useGetBestListsQuery({
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

  const { bestLists, totalCount } = data;

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
              <div className="view-col">Назва списку</div>
            </SortItem>
            <SortItem name="countContent">
              <div className="view-col">Кількість контенту</div>
            </SortItem>
            <SortItem name="createdAt">
              <div className="view-col">Дата додавання</div>
            </SortItem>
          </Sort>
          <div className="view-col">Дії</div>
        </div>
        {bestLists.length !== limit &&
          Array.from({ length: limit }).map((_, index) => {
            if (bestLists.length > index) {
              const bestList = bestLists[index];
              return <BestListItem key={bestList._id} {...bestList} />;
            } else {
              return <BestListItem key={`skeleton-genre-${index}`} skeleton />;
            }
          })}
        {bestLists.length === limit &&
          bestLists.map((bestList) => (
            <BestListItem key={bestList._id} {...bestList} />
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

export default BestList;
