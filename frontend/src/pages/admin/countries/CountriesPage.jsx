import React from "react";
import "./style.page.scss";
import useCountry from "../../../hooks/useCountry";
import CountriesAddPopup from "./CountriesAddPopup";
import { CountryList } from "../../../components";
import CountriesRemovePopup from "./CountriesRemovePopup";
import CountriesEditPopup from "./CountriesEditPopup";

const CountryPage = () => {
  const { isAddCountry, removeId, editId, addCountryHandler, isLoadingAdd } =
    useCountry();

  return (
    <>
      <div className="profile-user-content-title">Країни</div>
      <div className="profile-user-content-container">
        <div className="countries">
          <div className="view">
            <div className="view-actions">
              <button
                className="button primary"
                disabled={isAddCountry || isLoadingAdd}
                onClick={() => addCountryHandler()}
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
      {isAddCountry && <CountriesAddPopup />}
      {removeId && <CountriesRemovePopup />}
      {editId && <CountriesEditPopup />}
    </>
  );
};

export default CountryPage;
