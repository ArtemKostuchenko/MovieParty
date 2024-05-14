import React, { useState } from "react";
import "./style.page.scss";
import useCountry from "../../../hooks/useCountry";
import CountriesAddPopup from "./CountriesAddPopup";
import { CountryList } from "../../../components";

const CountryPage = () => {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const { isLoadingAdd } = useCountry();

  return (
    <>
      <div className="profile-user-content-title">Країни</div>
      <div className="profile-user-content-container">
        <div className="countries">
          <div className="view">
            <div className="view-actions">
              <button
                className="button primary"
                disabled={isOpenAdd || isLoadingAdd}
                onClick={() => setIsOpenAdd(!isOpenAdd)}
              >
                Додати країну
              </button>
              <div className="view-filters">
                <div className="form">
                  <div className="form__item">
                    <div className="form__input__icon g8">
                      <div className="icon find" />
                      <input type="text" placeholder="Пошук..." />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <CountryList />
          </div>
        </div>
      </div>
      {isOpenAdd && (
        <CountriesAddPopup isOpen={isOpenAdd} setIsOpen={setIsOpenAdd} />
      )}
    </>
  );
};

export default CountryPage;
