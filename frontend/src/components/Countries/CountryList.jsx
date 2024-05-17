import React, { useEffect } from "react";
import { useGetCountriesQuery } from "../../features/services/countries/countriesService";
import CountryItem from "./CountryItem";
import Pagination from "../Pagination/Pagination";
import useCountry from "../../hooks/useCountry";
import Sort from "../Sort/Sort";
import SortItem from "../Sort/SortItem";

const CountryList = ({ limit = 5, name = "" }) => {
  const { page, onChangePage, resetPage, sortName, sortType, onChangeSort } =
    useCountry();
  const { data, isLoading, isError } = useGetCountriesQuery({
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

  const { countries, totalCount } = data;

  return (
    <>
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
                <div className="view-col">Назва країни</div>
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
          {countries.length !== limit &&
            Array.from({ length: limit }).map((_, index) => {
              if (countries.length > index) {
                const country = countries[index];
                return <CountryItem key={country._id} {...country} />;
              } else {
                return (
                  <CountryItem key={`skeleton-country-${index}`} skeleton />
                );
              }
            })}
          {countries.length === limit &&
            countries.map((country) => (
              <CountryItem key={country._id} {...country} />
            ))}
        </div>
        <Pagination
          page={page}
          limit={limit}
          totalCount={totalCount}
          onChangePage={(ePage) => onChangePage(ePage)}
        />
      </div>
    </>
  );
};

export default CountryList;
