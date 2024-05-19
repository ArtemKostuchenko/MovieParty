import React from "react";
import { formatDate } from "../../features/utils/functions";
import ActionMenu from "../Menu/ActionMenu";
import ActionItem from "../Menu/ActionItem";
import usePopUp from "../../hooks/usePopup";

const CountryItem = ({
  _id,
  name,
  originName,
  icon,
  createdAt,
  skeleton = false,
}) => {
  const { handleEditPopUp, handleRemovePopUp } = usePopUp();

  if (skeleton) {
    return (
      <div className="view-row skeleton">
        <div className="view-col"></div>
        <div className="view-col"></div>
        <div className="view-col"></div>
        <div className="view-col"></div>
      </div>
    );
  }

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
            onClick={() => handleEditPopUp(_id)}
          />
          <ActionItem
            icon="rma"
            title="Видалити"
            onClick={() => handleRemovePopUp(_id)}
          />
        </ActionMenu>
      </div>
    </div>
  );
};

export default CountryItem;
