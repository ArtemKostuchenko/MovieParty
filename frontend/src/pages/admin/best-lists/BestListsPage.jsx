import React, { useState } from "react";
import "./style.page.scss";
import { BestList } from "../../../components";

import useBestList from "../../../hooks/useBestList";
import usePopup from "../../../hooks/usePopup";

const BestListsPage = () => {
  const { isLoadingAdd } = useBestList();
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
      <div className="profile-user-content-title">Списки</div>
      <div className="profile-user-content-container">
        <div className="genre">
          <div className="view">
            <div className="view-actions">
              <button
                className="button primary"
                disabled={isAdd || isLoadingAdd}
                onClick={() => handleAddPopUp()}
              >
                Додати список
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
            <BestList limit={8} name={name} />
          </div>
        </div>
      </div>
    </>
  );
};

export default BestListsPage;
