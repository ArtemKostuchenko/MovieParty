import React from "react";
import { formatDate } from "../../features/utils/functions";
import ActionMenu from "../Menu/ActionMenu";
import ActionItem from "../Menu/ActionItem";
import useCountry from "../../hooks/useCountry";

const CountryItem = ({ _id, name, originName, icon, createdAt }) => {
  const { removeCountryHandler, editCountryHandler } = useCountry();

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
        <ActionMenu>
          <ActionItem
            icon="eda"
            title="Редагувати"
            onClick={() => editCountryHandler(_id)}
          />
          <ActionItem
            icon="rma"
            title="Видалити"
            onClick={() => removeCountryHandler(_id)}
          />
        </ActionMenu>
      </div>
    </div>
  );
};

export default CountryItem;
