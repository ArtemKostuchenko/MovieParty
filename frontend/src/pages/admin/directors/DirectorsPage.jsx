import React, { useState } from "react";
import "./style.page.scss";
import { useNavigate } from "react-router-dom";

import usePopup from "../../../hooks/usePopup";
const DirectorsPage = () => {
  const { removeId } = usePopup();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");

  const handleSearch = (e) => {
    const timer = setTimeout(() => {
      setFullName(e.target.value);
    }, 500);

    return () => clearTimeout(timer);
  };

  return (
    <>
      <div className="profile-user-content-title">Режисери</div>
      <div className="profile-user-content-container">
        <div className="directors-list">
          <div className="view">
            <div className="view-actions">
              <button
                className="button primary"
                onClick={() => navigate("add")}
              >
                Додати режисера
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

export default DirectorsPage;
