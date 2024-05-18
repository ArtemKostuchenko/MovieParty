import React from "react";
import { formatDate } from "../../features/utils/functions";
import ActionMenu from "../Menu/ActionMenu";
import ActionItem from "../Menu/ActionItem";
import useGenre from "../../hooks/useGenre";

const GenreItem = ({ _id, name, originName, createdAt, skeleton = false }) => {
  const { editGenreHandler, removeGenreHandler } = useGenre();

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
      <div className="view-col">{originName}</div>
      <div className="view-col">{formatDate(createdAt)}</div>
      <div className="view-col">
        <ActionMenu>
          <ActionItem
            icon="eda"
            title="Редагувати"
            onClick={() => editGenreHandler(_id)}
          />
          <ActionItem
            icon="rma"
            title="Видалити"
            onClick={() => removeGenreHandler(_id)}
          />
        </ActionMenu>
      </div>
    </div>
  );
};

export default GenreItem;
