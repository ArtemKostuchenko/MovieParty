import React from "react";
import { useGetActorByIdQuery } from "../../../features/services/actors/actorsService";
import PopUp from "../../../components/PopUp/PopUp";
import useActor from "../../../hooks/useActor";
import usePopUp from "../../../hooks/usePopup";

const ActorsRemovePopup = () => {
  const { removeActor, isLoadingRemove } = useActor();
  const { removeId, handleResetPopUp } = usePopUp();

  if (!removeId) {
    return <></>;
  }

  const { data: actor, isLoading } = useGetActorByIdQuery(removeId);

  if (isLoading) {
    return (
      <PopUp
        title="Видалення актора"
        open={Boolean(removeId)}
        setOpen={handleResetPopUp}
      >
        <div className="loader__container">
          <div className="loader"></div>
        </div>
      </PopUp>
    );
  }

  const { _id, firstName, lastName, sex } = actor;

  const handleRemoveActor = async () => {
    const res = await removeActor(_id);
    console.log(res);
    handleResetPopUp();
  };

  return (
    <PopUp
      title={`Видалення ${sex === "Man" ? "актора" : "актриси"}`}
      open={Boolean(removeId)}
      setOpen={handleResetPopUp}
    >
      <div className="flex col g10">
        <div className="popup__text center">
          Ви дійсно бажаєте видалити {sex === "Man" ? "актора" : "актрису"}{" "}
          <span className="highlight">
            {firstName} {lastName}
          </span>
        </div>
        <button
          className="button primary"
          onClick={handleRemoveActor}
          disabled={isLoadingRemove}
        >
          Видалити
        </button>
      </div>
    </PopUp>
  );
};

export default ActorsRemovePopup;
