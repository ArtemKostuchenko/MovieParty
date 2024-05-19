import React, { useState } from "react";
import "./style.page.scss";
import useGenre from "../../../hooks/useGenre";
import usePopup from "../../../hooks/usePopup";
import { GenreList } from "../../../components";
import GenresAddPopup from "./GenresAddPopup";
import GenresEditPopup from "./GenresEditPopup";
import GenresRemovePopup from "./GenresRemovePopup";

const GenresPage = () => {
  const { isLoadingAdd } = useGenre();
  const { isAdd, removeId, editId, handleAddPopUp } = usePopup();
  const [name, setName] = useState("");

  const handleSearch = (e) => {
    const timer = setTimeout(() => {
      setName(e.target.value);
    }, 500);

    return () => clearTimeout(timer);
  };

  return (
    <>
      <div className="profile-user-content-title">Жанри</div>
      <div className="profile-user-content-container">
        <div className="genre">
          <div className="view">
            <div className="view-actions">
              <button
                className="button primary"
                disabled={isAdd || isLoadingAdd}
                onClick={() => handleAddPopUp()}
              >
                Додати жанр
              </button>
              <div className="view-filters">
                <div className="form">
                  <div className="form__item">
                    <div className="form__input__icon g8">
                      <div className="icon find" />
                      <input
                        type="text"
                        placeholder="Пошук..."
                        onChange={handleSearch}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <GenreList limit={8} name={name} />
          </div>
        </div>
      </div>
      {isAdd && <GenresAddPopup />}
      {editId && <GenresEditPopup />}
      {removeId && <GenresRemovePopup />}
    </>
  );
};

export default GenresPage;
