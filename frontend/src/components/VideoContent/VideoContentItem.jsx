import React from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../features/utils/functions";
import ActionMenu from "../Menu/ActionMenu";
import ActionItem from "../Menu/ActionItem";
import usePopUp from "../../hooks/usePopup";

const VideoContentItem = ({
  _id,
  title,
  originTitle,
  typeVideoContent,
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
      <div className="view-col">{title}</div>
      <div className="view-col">{originTitle}</div>
      <div className="view-col">{typeVideoContent}</div>
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

export default VideoContentItem;
