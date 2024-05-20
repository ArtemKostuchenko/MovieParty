import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.page.scss";
import { ActorList } from "../../../components";
import ActorsRemovePopup from "./ActorsRemovePopup";
import usePopup from "../../../hooks/usePopup";

const ActorsPage = () => {
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
      <div className="profile-user-content-title">Актори</div>
      <div className="profile-user-content-container">
        <div className="actors-list">
          <div className="view">
            <div className="view-actions">
              <button
                className="button primary"
                onClick={() => navigate("add")}
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
            <ActorList limit={8} fullName={fullName} />
          </div>
        </div>
      </div>
      {removeId && <ActorsRemovePopup />}
    </>
  );
};

export default ActorsPage;
