import React from "react";
import { formatDate } from "../../features/utils/functions";

const CountryItem = ({ id, name, originName, icon, createdAt }) => {
  const countryIcon = `${
    import.meta.env.VITE_BACK_HOST
  }/static/files/crs/${icon}`;
  return (
    <div className="view-row">
      <div className="view-col flex r g10">
        <img src={countryIcon} alt={name} className="c-i" />
        {name}
      </div>
      <div className="view-col">{originName}</div>
      <div className="view-col">{formatDate(createdAt)}</div>
      <div className="view-col">
        <div className="icon action" />
      </div>
    </div>
  );
};

export default CountryItem;
