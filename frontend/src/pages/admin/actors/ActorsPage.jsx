import React, { useState } from "react";
import "./style.page.scss";

import useActor from "../../../hooks/useActor";
import usePopup from "../../../hooks/usePopup";

const ActorsPage = () => {
  const { isLoadingAdd } = useActor();
  const { isAdd, removeId, editId, handleAddPopUp } = usePopup();
  const [fullName, setFullName] = useState("");

  const handleSearch = (e) => {
    const timer = setTimeout(() => {
      setFullName(e.target.value);
    }, 500);

    return () => clearTimeout(timer);
  };

  return (
    <>
      <div className="profile-user-content-title">Актори</div>
      <div className="profile-user-content-container">
        <div className="best-lists">
          <div className="view">
            <div className="view-actions">
              <button
                className="button primary"
                disabled={isAdd || isLoadingAdd}
                onClick={() => handleAddPopUp()}
              >
                Додати актора
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
          </div>
        </div>
      </div>
    </>
  );
};

export default ActorsPage;
