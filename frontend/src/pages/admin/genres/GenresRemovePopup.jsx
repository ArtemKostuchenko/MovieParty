import React from "react";
import { useGetGenreByIdQuery } from "../../../features/services/genre/genreService";
import PopUp from "../../../components/PopUp/PopUp";
import useGenre from "../../../hooks/useGenre";

const GenresRemovePopup = () => {
  const { removeId, resetHandler, removeGenre, isLoadingRemove } = useGenre();

  if (!removeId) {
    return <></>;
  }

  const { data: genre, isLoading } = useGetGenreByIdQuery(removeId);

  if (isLoading) {
    return (
      <PopUp
        title="Видалення жанру"
        open={Boolean(removeId)}
        setOpen={resetHandler}
      >
        <div className="loader__container">
          <div className="loader"></div>
        </div>
      </PopUp>
    );
  }

  const handleRemoveGenre = async () => {
    const res = await removeGenre(_id);
    console.log(res);
    resetHandler();
  };

  const { _id, name } = genre;

  return (
    <PopUp
      title="Видалення жанру"
      open={Boolean(removeId)}
      setOpen={resetHandler}
    >
      <div className="flex col g10">
        <div className="popup__text center">
          Ви дійсно бажаєте видалити жанр{" "}
          <span className="highlight">{name}</span>
        </div>
        <button
          className="button primary"
          onClick={handleRemoveGenre}
          disabled={isLoadingRemove}
        >
          Видалити
        </button>
      </div>
    </PopUp>
  );
};

export default GenresRemovePopup;
