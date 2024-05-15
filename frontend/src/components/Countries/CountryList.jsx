import React, { useEffect } from "react";
import { useGetCountriesQuery } from "../../features/services/countries/countriesService";
import CountryItem from "./CountryItem";
import Pagination from "../Pagination/Pagination";
import useCountry from "../../hooks/useCountry";

const CountryList = ({ limit = 5, name = "" }) => {
  const { page, onChangePage, resetPage } = useCountry();
  const { data, isLoading, isError } = useGetCountriesQuery({
    name,
    page,
    limit,
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
            <div className="view-col">Назва країни</div>
            <div className="view-col">Оригінальна назва</div>
            <div className="view-col">Дата додавання</div>
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
