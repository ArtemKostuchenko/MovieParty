import React from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../features/utils/functions";
import ActionMenu from "../Menu/ActionMenu";
import ActionItem from "../Menu/ActionItem";
import usePopUp from "../../hooks/usePopup";

const DirectorItem = ({
  _id,
  lastName,
  firstName,
  lastNameEng,
  firstNameEng,
  createdAt,
  skeleton = false,
}) => {
  const navigate = useNavigate();
  const { handleRemovePopUp } = usePopUp();

  if (skeleton) {
    return (
      <div className="view-row skeleton">
        <div className="view-col"></div>
        <div className="view-col"></div>
        <div className="view-col"></div>
        <div className="view-col"></div>
        <div className="view-col"></div>
      </div>
    );
  }

  return (
    <div className="view-row">
      <div className="view-col">{lastName}</div>
      <div className="view-col">{firstName}</div>
      <div className="view-col">
        {firstNameEng} {lastNameEng}
      </div>
      <div className="view-col">{formatDate(createdAt)}</div>
      <div className="view-col">
        <ActionMenu>
          <ActionItem
            icon="eda"
            title="Редагувати"
            onClick={() => navigate(`${_id}/edit`)}
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

export default DirectorItem;
