import React from "react";
import "./style.page.scss";

const PersonalPage = () => {
  return (
    <>
      <div className="flex r sb ch">
        <div className="profile-user-content-title">Персональні дані</div>
        <button className="button primary" disabled>
          Зберегти
        </button>
      </div>
      <div className="profile-user-content-container">
        <div className="personal">
          <div className="personal-items">
            <div className="personal-item">
              <div className="personal-title">Нікнейм</div>
              <input
                type="text"
                className="form__input linear"
                defaultValue="Qwerty"
              />
            </div>
            <div className="personal-item">
              <div className="personal-title">Електронна пошта</div>
              <input
                type="email"
                className="form__input linear"
                defaultValue="qwerty@gmail.com"
              />
            </div>
            <div className="personal-item">
              <div className="personal-title">Країна</div>
              <div className="dropdown linear fill">
                <div className="dropdown__selected">
                  <div className="dropdown__title">CША</div>
                  <div className="dropdown__icon">
                    <svg
                      width={14}
                      height={9}
                      viewBox="0 0 14 9"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.938664 0.727821C1.32889 0.337597 1.96146 0.337252 2.35211 0.72705L6.29366 4.66002C6.68401 5.04952 7.31599 5.04952 7.70634 4.66002L11.6479 0.72705C12.0385 0.337253 12.6711 0.337597 13.0613 0.72782L13.2929 0.959377C13.6834 1.3499 13.6834 1.98307 13.2929 2.37359L7.70711 7.95938C7.31658 8.3499 6.68342 8.3499 6.29289 7.95938L0.707106 2.37359C0.316582 1.98307 0.316582 1.3499 0.707107 0.959377L0.938664 0.727821Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>
                <div className="dropdown__list">
                  <div className="dropdown__item selected">США</div>
                  <div className="dropdown__item">Велика Британія</div>
                  <div className="dropdown__item">Україна</div>
                  <div className="dropdown__item">Швеція</div>
                </div>
              </div>
            </div>
            <div className="personal-item">
              <div className="personal-title">Стать</div>
              <div className="dropdown linear fill">
                <div className="dropdown__selected">
                  <div className="dropdown__title">Чоловіча</div>
                  <div className="dropdown__icon">
                    <svg
                      width={14}
                      height={9}
                      viewBox="0 0 14 9"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.938664 0.727821C1.32889 0.337597 1.96146 0.337252 2.35211 0.72705L6.29366 4.66002C6.68401 5.04952 7.31599 5.04952 7.70634 4.66002L11.6479 0.72705C12.0385 0.337253 12.6711 0.337597 13.0613 0.72782L13.2929 0.959377C13.6834 1.3499 13.6834 1.98307 13.2929 2.37359L7.70711 7.95938C7.31658 8.3499 6.68342 8.3499 6.29289 7.95938L0.707106 2.37359C0.316582 1.98307 0.316582 1.3499 0.707107 0.959377L0.938664 0.727821Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>
                <div className="dropdown__list">
                  <div className="dropdown__item selected">Чоловіча</div>
                  <div className="dropdown__item">Жіноча</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalPage;
