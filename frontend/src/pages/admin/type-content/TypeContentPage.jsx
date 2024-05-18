import React from "react";
import "./style.page.scss";

const TypeContentPage = () => {
  return (
    <>
      <div className="profile-user-content-title">Тип контенту</div>
      <div className="profile-user-content-container">
        <div className="typeContent">
          <div className="view">
            <div className="view-actions">
              <button className="button primary">Додати тип</button>
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
                  <div className="view-col">Назва типу</div>
                  <div className="view-col">Шлях</div>
                  <div className="view-col">Дата додавання</div>
                  <div className="view-col">Дії</div>
                </div>
                <div className="view-row">
                  <div className="view-col">Фільми</div>
                  <div className="view-col">
                    <div className="path">
                      <div className="path__icon">/</div>
                      <div className="path__content">movies</div>
                    </div>
                  </div>
                  <div className="view-col">20 бер, 2024</div>
                  <div className="view-col">
                    <div className="icon action" />
                  </div>
                </div>
                <div className="view-row">
                  <div className="view-col">Серіали</div>
                  <div className="view-col">
                    <div className="path">
                      <div className="path__icon">/</div>
                      <div className="path__content">series</div>
                    </div>
                  </div>
                  <div className="view-col">20 бер, 2024</div>
                  <div className="view-col">
                    <div className="icon action" />
                  </div>
                </div>
                <div className="view-row">
                  <div className="view-col">Мультфільми</div>
                  <div className="view-col">
                    <div className="path">
                      <div className="path__icon">/</div>
                      <div className="path__content">cartoons</div>
                    </div>
                  </div>
                  <div className="view-col">20 бер, 2024</div>
                  <div className="view-col">
                    <div className="icon action" />
                  </div>
                </div>
                <div className="view-row">
                  <div className="view-col">Мультсеріали</div>
                  <div className="view-col">
                    <div className="path">
                      <div className="path__icon">/</div>
                      <div className="path__content">cartoon-series</div>
                    </div>
                  </div>
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
    </>
  );
};

export default TypeContentPage;
