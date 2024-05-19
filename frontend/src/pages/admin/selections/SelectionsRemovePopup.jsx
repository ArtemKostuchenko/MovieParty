import React from "react";
import { useGetSelectionByIdQuery } from "../../../features/services/selections/selectionsService";
import PopUp from "../../../components/PopUp/PopUp";
import useSelection from "../../../hooks/useSelection";
import usePopUp from "../../../hooks/usePopup";

const SelectionsRemovePopup = () => {
  const { removeSelection, isLoadingRemove } = useSelection();
  const { removeId, handleResetPopUp } = usePopUp();

  if (!removeId) {
    return <></>;
  }

  const { data: selection, isLoading } = useGetSelectionByIdQuery(removeId);

  if (isLoading) {
    return (
      <PopUp
        title="Видалення підбірки"
        open={Boolean(removeId)}
        setOpen={handleResetPopUp}
      >
        <div className="loader__container">
          <div className="loader"></div>
        </div>
      </PopUp>
    );
  }

  const { _id, name } = selection;

  const handleRemoveSelection = async () => {
    const res = await removeSelection(_id);
    console.log(res);
    handleResetPopUp();
  };

  return (
    <PopUp
      title="Видалення підбірки"
      open={Boolean(removeId)}
      setOpen={handleResetPopUp}
    >
      <div className="flex col g10">
        <div className="popup__text center">
          Ви дійсно бажаєте видалити підбірку{" "}
          <span className="highlight">{name}</span>
        </div>
        <button
          className="button primary"
          onClick={handleRemoveSelection}
          disabled={isLoadingRemove}
        >
          Видалити
        </button>
      </div>
    </PopUp>
  );
};

export default SelectionsRemovePopup;
