import React from "react";
import useTypeContent from "../../../hooks/useTypeContent";
import usePopUp from "../../../hooks/usePopup";
import PopUp from "../../../components/PopUp/PopUp";
import { useGetTypeContentByIdQuery } from "../../../features/services/type-content/typeContentService";

const TypeContentRemovePopup = () => {
  const { removeTypeContent, isLoadingRemove } = useTypeContent();
  const { removeId, handleResetPopUp } = usePopUp();

  if (!removeId) {
    return <></>;
  }

  const { data: typeContent, isLoading } = useGetTypeContentByIdQuery(removeId);

  if (isLoading) {
    return (
      <PopUp
        title="Видалення країни"
        open={Boolean(removeId)}
        setOpen={handleResetPopUp}
      >
        <div className="loader__container">
          <div className="loader"></div>
        </div>
      </PopUp>
    );
  }

  const { _id, name } = typeContent;

  const handleRemoveTypeContent = async () => {
    const res = await removeTypeContent(_id);
    console.log(res);
    handleResetPopUp();
  };

  return (
    <PopUp
      title="Видалення типу контенту"
      open={Boolean(removeId)}
      setOpen={handleResetPopUp}
    >
      <div className="flex col g10">
        <div className="popup__text center">
          Ви дійсно бажаєте видалити тип контенту{" "}
          <span className="highlight">{name}</span>
        </div>
        <button
          className="button primary"
          onClick={handleRemoveTypeContent}
          disabled={isLoadingRemove}
        >
          Видалити
        </button>
      </div>
    </PopUp>
  );
};

export default TypeContentRemovePopup;
