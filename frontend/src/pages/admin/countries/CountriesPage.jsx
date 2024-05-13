import React, { useState } from "react";
import ua from "../../../assets/icons/ua.svg";
import us from "../../../assets/icons/us.svg";
import gb from "../../../assets/icons/gb.svg";
import "./style.page.scss";
import PopUp from "../../../components/PopUp/PopUp";

const CountryPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="profile-user-content-title">Країни</div>
      <div className="profile-user-content-container">
        <div className="countries">
          <div className="view">
            <div className="view-actions">
              <button
                className="button primary"
                disabled={isOpen}
                onClick={() => setIsOpen(!isOpen)}
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
            <div className="overflow-content">
              <div className="view-items">
                <div className="view-row head">
                  <div className="view-col">Назва країни</div>
                  <div className="view-col">Оригінальна назва</div>
                  <div className="view-col">Дата додавання</div>
                  <div className="view-col">Дії</div>
                </div>
                <div className="view-row">
                  <div className="view-col flex r g10">
                    <img src={ua} alt="Україна" className="c-i" />
                    Україна
                  </div>
                  <div className="view-col">Ukraine</div>
                  <div className="view-col">20 бер, 2024</div>
                  <div className="view-col">
                    <div className="icon action" />
                  </div>
                </div>
                <div className="view-row">
                  <div className="view-col flex r g10">
                    <img src={us} alt="США" className="c-i" />
                    США
                  </div>
                  <div className="view-col">USA</div>
                  <div className="view-col">20 бер, 2024</div>
                  <div className="view-col">
                    <div className="icon action" />
                  </div>
                </div>
                <div className="view-row">
                  <div className="view-col flex r g10">
                    <img src={gb} alt="Велика Британія" className="c-i" />
                    Велика Британія
                  </div>
                  <div className="view-col">United Kingdom</div>
                  <div className="view-col">20 бер, 2024</div>
                  <div className="view-col">
                    <div className="icon action" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PopUp open={isOpen} setOpen={setIsOpen}>
        Test PopUp!
      </PopUp>
    </>
  );
};

export default CountryPage;
