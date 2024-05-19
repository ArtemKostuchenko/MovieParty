import React from "react";
import { formatDate } from "../../features/utils/functions";
import ActionMenu from "../Menu/ActionMenu";
import ActionItem from "../Menu/ActionItem";
import usePopUp from "../../hooks/usePopup";

const TypeContentItem = ({ _id, name, path, createdAt, skeleton = false }) => {
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
  return (
    <div className="view-row">
      <div className="view-col">{name}</div>
      <div className="view-col">
        <div className="path">
          <div className="path__icon">/</div>
          <div className="path__content">{path}</div>
        </div>
      </div>
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

export default TypeContentItem;
