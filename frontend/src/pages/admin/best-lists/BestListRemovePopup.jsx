import React from "react";
import { useGetBestListByIdQuery } from "../../../features/services/best-lists/bestListsService";
import PopUp from "../../../components/PopUp/PopUp";
import useBestList from "../../../hooks/useBestList";
import usePopUp from "../../../hooks/usePopup";

const BestListRemovePopup = () => {
  const { removeBestList, isLoadingRemove } = useBestList();
  const { removeId, handleResetPopUp } = usePopUp();

  if (!removeId) {
    return <></>;
  }

  const { data: bestList, isLoading } = useGetBestListByIdQuery(removeId);

  if (isLoading) {
    return (
      <PopUp
        title="Видалення жанру"
        open={Boolean(removeId)}
        setOpen={handleResetPopUp}
      >
        <div className="loader__container">
          <div className="loader"></div>
        </div>
      </PopUp>
    );
  }

  const { _id, name } = bestList;

  const handleRemoveBestList = async () => {
    const res = await removeBestList(_id);
    console.log(res);
    handleResetPopUp();
  };

  return (
    <PopUp
      title="Видалення списку"
      open={Boolean(removeId)}
      setOpen={handleResetPopUp}
    >
      <div className="flex col g10">
        <div className="popup__text center">
          Ви дійсно бажаєте видалити список{" "}
          <span className="highlight">{name}</span>
        </div>
        <button
          className="button primary"
          onClick={handleRemoveBestList}
          disabled={isLoadingRemove}
        >
          Видалити
        </button>
      </div>
    </PopUp>
  );
};

export default BestListRemovePopup;
