import React, { useState } from "react";
import "./style.page.scss";
import { PartList } from "../../../components";
import PartsAddPopup from "./PartsAddPopup";
import usePart from "../../../hooks/usePart";
import usePopup from "../../../hooks/usePopup";

const PartsPage = () => {
  const { isLoadingAdd } = usePart();
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
      <div className="profile-user-content-title">Частини</div>
      <div className="profile-user-content-container">
        <div className="best-lists">
          <div className="view">
            <div className="view-actions">
              <button
                className="button primary"
                disabled={isAdd || isLoadingAdd}
                onClick={() => handleAddPopUp()}
              >
                Додати частину
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
            <PartList limit={8} name={name} />
          </div>
        </div>
      </div>
      {isAdd && <PartsAddPopup />}
    </>
  );
};

export default PartsPage;
