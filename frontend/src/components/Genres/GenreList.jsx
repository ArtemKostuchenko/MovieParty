import React, { useEffect } from "react";
import { useGetGenresQuery } from "../../features/services/genre/genreService";
import Sort from "../Sort/Sort";
import SortItem from "../Sort/SortItem";
import Pagination from "../Pagination/Pagination";
import GenreItem from "./GenreItem";
import useGenre from "../../hooks/useGenre";

const GenreList = ({ limit = 5, name = "" }) => {
  const { page, onChangePage, resetPage, sortName, sortType, onChangeSort } =
    useGenre();

  const { data, isLoading, isError } = useGetGenresQuery({
    name,
    page,
    limit,
    sortName,
    sortType,
  });

  useEffect(() => {
    return () => {
      resetPage();
    };
  }, []);

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

  console.log(data);

  const { genres, totalCount } = data;

  return (
    <div className="overflow-content">
      <div className="view-items">
        <div className="view-row head">
          <Sort
            onChange={(sortName, sortType) => {
              onChangeSort(sortName, sortType);
            }}
            sortName={sortName}
            sortType={sortType}
          >
            <SortItem name="name">
              <div className="view-col">Назва жанру</div>
            </SortItem>
            <SortItem name="originName">
              <div className="view-col">Оригінальна назва</div>
            </SortItem>
            <SortItem name="createdAt">
              <div className="view-col">Дата додавання</div>
            </SortItem>
          </Sort>
          <div className="view-col">Дії</div>
        </div>
        {genres.length !== limit &&
          Array.from({ length: limit }).map((_, index) => {
            if (genres.length > index) {
              const genre = genres[index];
              return <GenreItem key={genre._id} {...genre} />;
            } else {
              return <GenreItem key={`skeleton-genre-${index}`} skeleton />;
            }
          })}
        {genres.length === limit &&
          genres.map((genre) => <GenreItem key={genre._id} {...genre} />)}
      </div>
      <Pagination
        page={page}
        limit={limit}
        totalCount={totalCount}
        onChangePage={(ePage) => onChangePage(ePage)}
      />
    </div>
  );
};

export default GenreList;
