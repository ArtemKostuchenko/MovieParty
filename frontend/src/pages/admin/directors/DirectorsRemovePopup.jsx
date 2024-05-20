import React from "react";
import { useGetDirectorByIdQuery } from "../../../features/services/directors/directorsService";
import PopUp from "../../../components/PopUp/PopUp";
import useDirector from "../../../hooks/useDirector";
import usePopUp from "../../../hooks/usePopup";

const DirectorsRemovePopup = () => {
  const { removeDirector, isLoadingRemove } = useDirector();
  const { removeId, handleResetPopUp } = usePopUp();

  if (!removeId) {
    return <></>;
  }

  const { data: director, isLoading } = useGetDirectorByIdQuery(removeId);

  if (isLoading) {
    return (
      <PopUp
        title="Видалення режисера"
        open={Boolean(removeId)}
        setOpen={handleResetPopUp}
      >
        <div className="loader__container">
          <div className="loader"></div>
        </div>
      </PopUp>
    );
  }

  const { _id, firstName, lastName, sex } = director;

  const handleRemoveDirector = async () => {
    const res = await removeDirector(_id);
    console.log(res);
    handleResetPopUp();
  };

  return (
    <PopUp
      title="Видалення режисера"
      open={Boolean(removeId)}
      setOpen={handleResetPopUp}
    >
      <div className="flex col g10">
        <div className="popup__text center">
          Ви дійсно бажаєте видалити режисера{" "}
          <span className="highlight">
            {firstName} {lastName}
          </span>
        </div>
        <button
          className="button primary"
          onClick={handleRemoveDirector}
          disabled={isLoadingRemove}
        >
          Видалити
        </button>
      </div>
    </PopUp>
  );
};

export default DirectorsRemovePopup;
