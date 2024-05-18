import React from "react";
import useTypeContent from "../../../hooks/useTypeContent";
import PopUp from "../../../components/PopUp/PopUp";
import { useGetTypeContentByIdQuery } from "../../../features/services/type-content/typeContentService";

const TypeContentRemovePopup = () => {
  const { removeId, resetHandler, removeTypeContent } = useTypeContent();

  if (!removeId) {
    return <></>;
  }

  const { data: country, isLoading } = useGetTypeContentByIdQuery(removeId);

  if (isLoading) {
    return (
      <PopUp
        title="Видалення країни"
        open={Boolean(removeId)}
        setOpen={resetHandler}
      >
        <div className="loader__container">
          <div className="loader"></div>
        </div>
      </PopUp>
    );
  }

  const { _id, name } = country;

  const handleRemoveTypeContent = async () => {
    const res = await removeTypeContent(_id);
    console.log(res);
    resetHandler();
  };

  return (
    <PopUp
      title="Видалення типу контенту"
      open={Boolean(removeId)}
      setOpen={resetHandler}
    >
      <div className="flex col g10">
        <div className="popup__text center">
          Ви дійсно бажаєте видалити тип контенту{" "}
          <span className="highlight">{name}</span>
        </div>
        <button
          className="button primary"
          onClick={handleRemoveTypeContent}
          // disabled={isLoadingRemove}
        >
          Видалити
        </button>
      </div>
    </PopUp>
  );
};

export default TypeContentRemovePopup;
