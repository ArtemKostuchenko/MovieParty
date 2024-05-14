import React from "react";
import { useGetCountriesQuery } from "../../features/services/countries/countriesService";
import CountryItem from "./CountryItem";

const CountryList = () => {
  const { data: countries, isLoading, isError } = useGetCountriesQuery();

  if (isLoading) {
    return (
      <div className="loader__container">
        <div className="loader"></div>
      </div>
    );
  }

  if (isError) {
    return <div className="overflow-content">Error...</div>;
  }

  return (
    <div className="overflow-content">
      <div className="view-items">
        <div className="view-row head">
          <div className="view-col">Назва країни</div>
          <div className="view-col">Оригінальна назва</div>
          <div className="view-col">Дата додавання</div>
          <div className="view-col">Дії</div>
        </div>
        {countries.map((country) => (
          <CountryItem key={country._id} {...country} />
        ))}
      </div>
    </div>
  );
};

export default CountryList;
