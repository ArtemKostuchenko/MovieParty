import React from "react";
import { useGetDirectorsQuery } from "../../features/services/directors/directorsService";
import DirectorItem from "./DirectorItem";
import { Pagination } from "../Pagination";
import { Sort, SortItem } from "../Sort";
import useSort from "../../hooks/useSort";
import usePagination from "../../hooks/usePagination";

const DirectorList = ({ limit = 5, fullName = "" }) => {
  const { sortName, sortType, handleChangeSort } = useSort();
  const { page, handleChangePage } = usePagination();

  const { data, isLoading, isError } = useGetDirectorsQuery({
    fullName,
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

  const { directors, totalCount } = data;

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
            <SortItem name="lastName">
              <div className="view-col">Прізвище</div>
            </SortItem>
            <SortItem name="firstName">
              <div className="view-col">Ім`я</div>
            </SortItem>
            <SortItem name="fullName">
              <div className="view-col">Прізвище та ім`я (анг)</div>
            </SortItem>
            <SortItem name="createdAt">
              <div className="view-col">Дата додавання</div>
            </SortItem>
          </Sort>
          <div className="view-col">Дії</div>
        </div>
        {directors.length !== limit &&
          Array.from({ length: limit }).map((_, index) => {
            if (directors.length > index) {
              const director = directors[index];
              return <DirectorItem key={director._id} {...director} />;
            } else {
              return (
                <DirectorItem key={`skeleton-director-${index}`} skeleton />
              );
            }
          })}
        {directors.length === limit &&
          directors.map((director) => (
            <DirectorItem key={director._id} {...director} />
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

export default DirectorList;
