import React from "react";
import { useGetActorsQuery } from "../../features/services/actors/actorsService";
import ActorItem from "./ActorItem";
import { Pagination } from "../Pagination";
import { Sort, SortItem } from "../Sort";
import useSort from "../../hooks/useSort";
import usePagination from "../../hooks/usePagination";

const PersonList = ({ limit = 5, fullName = "" }) => {
  const { sortName, sortType, handleChangeSort } = useSort();
  const { page, handleChangePage } = usePagination();

  const { data, isLoading, isError } = useGetActorsQuery({
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

  const { actors, totalCount } = data;

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
        {actors.length !== limit &&
          Array.from({ length: limit }).map((_, index) => {
            if (actors.length > index) {
              const actor = actors[index];
              return <ActorItem key={actor._id} {...actor} />;
            } else {
              return <ActorItem key={`skeleton-actor-${index}`} skeleton />;
            }
          })}
        {actors.length === limit &&
          actors.map((actor) => <ActorItem key={actor._id} {...actor} />)}
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

export default PersonList;
