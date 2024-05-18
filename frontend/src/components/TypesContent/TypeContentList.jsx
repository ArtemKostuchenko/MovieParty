import React from "react";
import { useGetTypesContentQuery } from "../../features/services/type-content/typeContentService";
import Sort from "../Sort/Sort";
import SortItem from "../Sort/SortItem";
import TypeContentItem from "./TypeContentItem";

const TypeContentList = ({ limit = 5, name = "" }) => {
  const { data, isLoading, isError } = useGetTypesContentQuery();

  if (isLoading) {
    return (
      <>
        <div className="loader__container">
          <div className="loader"></div>
        </div>
        <Pagination page={1} limit={limit} totalCount={1} />
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
              console.log(sortName, sortType);
            }}
            sortName={"createdAt"}
            sortType={"asc"}
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
    </div>
  );
};

export default TypeContentList;
