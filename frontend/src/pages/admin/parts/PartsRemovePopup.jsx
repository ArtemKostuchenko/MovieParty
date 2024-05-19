import React from "react";
import { useGetPartByIdQuery } from "../../../features/services/parts/partsService";
import PopUp from "../../../components/PopUp/PopUp";
import usePart from "../../../hooks/usePart";
import usePopUp from "../../../hooks/usePopup";

const PartsRemovePopup = () => {
  const { removePart, isLoadingRemove } = usePart();
  const { removeId, handleResetPopUp } = usePopUp();

  if (!removeId) {
    return <></>;
  }

  const { data: part, isLoading } = useGetPartByIdQuery(removeId);

  if (isLoading) {
    return (
      <PopUp
        title="Видалення частини"
        open={Boolean(removeId)}
        setOpen={handleResetPopUp}
      >
        <div className="loader__container">
          <div className="loader"></div>
        </div>
      </PopUp>
    );
  }

  const { _id, name } = part;

  const handleRemovePart = async () => {
    const res = await removePart(_id);
    console.log(res);
    handleResetPopUp();
  };

  return (
    <PopUp
      title="Видалення частини"
      open={Boolean(removeId)}
      setOpen={handleResetPopUp}
    >
      <div className="flex col g10">
        <div className="popup__text center">
          Ви дійсно бажаєте видалити частину{" "}
          <span className="highlight">{name}</span>
        </div>
        <button
          className="button primary"
          onClick={handleRemovePart}
          disabled={isLoadingRemove}
        >
          Видалити
        </button>
      </div>
    </PopUp>
  );
};

export default PartsRemovePopup;
