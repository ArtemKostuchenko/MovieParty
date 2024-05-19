import React from "react";
import { useGetTypesContentQuery } from "../../features/services/type-content/typeContentService";
import TypeContentItem from "./TypeContentItem";
import { Pagination } from "../Pagination";
import { Sort, SortItem } from "../Sort";
import useSort from "../../hooks/useSort";
import usePagination from "../../hooks/usePagination";

const TypeContentList = ({ limit = 5, name = "" }) => {
  const { sortName, sortType, handleChangeSort } = useSort();
  const { page, handleChangePage } = usePagination();

  const { data, isLoading, isError } = useGetTypesContentQuery({
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

  const { typesContent, totalCount } = data;

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
              <div className="view-col">Назва типу</div>
            </SortItem>
            <SortItem name="path">
              <div className="view-col">Шлях</div>
            </SortItem>
            <SortItem name="createdAt">
              <div className="view-col">Дата додавання</div>
            </SortItem>
          </Sort>
          <div className="view-col">Дії</div>
        </div>
        {typesContent.length !== limit &&
          Array.from({ length: limit }).map((_, index) => {
            if (typesContent.length > index) {
              const typeContent = typesContent[index];
              return <TypeContentItem key={typeContent._id} {...typeContent} />;
            } else {
              return (
                <TypeContentItem
                  key={`skeleton-type-content-${index}`}
                  skeleton
                />
              );
            }
          })}
        {typesContent.length === limit &&
          typesContent.map((typeContent) => (
            <TypeContentItem key={typeContent._id} {...typeContent} />
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

export default TypeContentList;
